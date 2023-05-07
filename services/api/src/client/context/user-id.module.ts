import {
  MiddlewareConsumer,
  Module,
  NestModule,
  UnauthorizedException,
} from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";

import { Logger } from "src/infrastructure/logger.service";

import { AlsModule } from "./als.module";

export interface UserIdStore {
  userId: string;
}

@Module({
  imports: [AlsModule],
})
export class UserIdModule implements NestModule {
  private logger = new Logger(UserIdModule.name);

  constructor(private readonly als: AsyncLocalStorage<UserIdStore>) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        (
          req: FastifyRequest["raw"],
          _: FastifyReply["raw"],
          next: () => void,
        ) => {
          const userId = req.headers["x-user-id"];

          if (typeof userId != "string") {
            this.logger.error(
              "Failed authentication attempt. This indicates an error in the reverse proxy.",
            );

            throw new UnauthorizedException(
              "Unable to parse user id from request",
            );
          }

          const store: UserIdStore = {
            userId,
          };

          this.als.run(store, () => next());
        },
      )
      .forRoutes("*");
  }
}
