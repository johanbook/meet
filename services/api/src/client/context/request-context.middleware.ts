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
import { RequestContext } from "./request-context.interface";

@Module({
  imports: [AlsModule],
})
export class RequestContextMiddleware implements NestModule {
  private logger = new Logger(RequestContextMiddleware.name);

  constructor(private readonly als: AsyncLocalStorage<RequestContext>) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        (
          req: FastifyRequest["raw"],
          _: FastifyReply["raw"],
          next: () => void,
        ) => {
          const correlationId = req.headers["x-correlation-id"];
          const userId = req.headers["x-user-id"];

          if (typeof correlationId != "string") {
            this.logger.error(
              "Failed parsing correlation ID. This indicates an error in the reverse proxy.",
            );

            throw new UnauthorizedException(
              "Unable to parse correlation ID from request",
            );
          }

          if (typeof userId != "string") {
            this.logger.error(
              "Failed authentication attempt. This indicates an error in the reverse proxy.",
            );

            throw new UnauthorizedException(
              "Unable to parse user ID from request",
            );
          }

          const store: RequestContext = {
            correlationId,
            userId,
          };

          this.als.run(store, () => next());
        },
      )
      .forRoutes("*");
  }
}
