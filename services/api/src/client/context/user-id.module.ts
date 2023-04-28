import {
  MiddlewareConsumer,
  Module,
  NestModule,
  UnauthorizedException,
} from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";

import { AlsModule } from "./als.module";

export interface UserIdStore {
  userId: string;
}

@Module({
  imports: [AlsModule],
})
export class UserIdModule implements NestModule {
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
