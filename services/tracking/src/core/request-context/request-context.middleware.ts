import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  UnauthorizedException,
} from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";

import { Logger } from "../logging/logger.service";
import { AlsModule, REQUEST_CONTEXT_KEY } from "./als.module";
import { RequestContext } from "./request-context.interface";

@Module({
  imports: [AlsModule],
})
export class RequestContextMiddleware implements NestModule {
  private logger = new Logger(RequestContextMiddleware.name);

  constructor(
    @Inject(REQUEST_CONTEXT_KEY)
    private readonly als: AsyncLocalStorage<RequestContext>,
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
          const userAgent = req.headers["user-agent"];
          let userId = req.headers["x-user-id"];

          if (typeof correlationId != "string") {
            this.logger.error(
              "Failed parsing correlation ID. This indicates an error in the reverse proxy.",
            );

            throw new UnauthorizedException(
              "Unable to parse correlation ID from request",
            );
          }

          if (typeof userId != "string") {
            userId = "";
          }

          const store: RequestContext = {
            correlationId,
            userAgent,
            userId,
          };

          this.als.run(store, () => next());
        },
      )
      .forRoutes("*");
  }
}
