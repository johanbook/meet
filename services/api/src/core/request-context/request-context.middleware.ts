import { Inject, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";

import { Logger } from "src/core/logging";

import { AlsModule, REQUEST_CONTEXT_KEY } from "./als.module";
import { IRequestContext } from "./request-context.interface";

@Module({
  imports: [AlsModule],
})
export class RequestContextMiddleware implements NestModule {
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
          let userId: string | undefined;

          const headerUserId = req.headers["x-user-id"];
          if (typeof headerUserId === "string") {
            userId = headerUserId;
          }

          const store: IRequestContext = {
            userId,
          };

          this.als.run(store, () => next());
        },
      )
      .forRoutes("*");
  }
}
