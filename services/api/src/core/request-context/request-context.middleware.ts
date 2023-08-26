import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  UnauthorizedException,
} from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";

import { Logger } from "src/core/logging";

import { AlsModule, REQUEST_CONTEXT_KEY } from "./als.module";
import { IRequestContext } from "./request-context.interface";

@Module({
  imports: [AlsModule],
})
export class RequestContextMiddleware implements NestModule {
  private logger = new Logger(RequestContextMiddleware.name);

  constructor(
    @Inject(REQUEST_CONTEXT_KEY)
    private readonly als: AsyncLocalStorage<IRequestContext>,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        (
          req: FastifyRequest["raw"],
          _: FastifyReply["raw"],
          next: () => void,
        ) => {
          const correlationId = req.headers["x-correlation-id"];
          let userEmail: string | undefined;
          let userId: string | undefined;

          if (typeof correlationId != "string") {
            this.logger.error(
              "Failed parsing correlation ID. This indicates an error in the reverse proxy.",
            );

            throw new UnauthorizedException(
              "Unable to parse correlation ID from request",
            );
          }

          const headerUserId = req.headers["x-user-id"];
          if (typeof headerUserId === "string") {
            userId = headerUserId;
          }

          const headerUserEmail = req.headers["x-email"];
          if (typeof headerUserEmail === "string") {
            userEmail = headerUserEmail;
          }

          const store: IRequestContext = {
            correlationId,
            userEmail,
            userId,
          };

          this.als.run(store, () => next());
        },
      )
      .forRoutes("*");
  }
}
