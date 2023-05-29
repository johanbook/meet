import { Inject, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";

import { Logger } from "src/infrastructure/logger.service";

import { Permission } from "../../permissions.enum";
import {
  PERMISSION_ALS_NAME,
  PermissionAlsModule,
} from "./permission-als.module";
import { PermissionContext } from "./permission-context.interface";

@Module({
  imports: [PermissionAlsModule],
})
export class PermissionsMiddleware implements NestModule {
  private logger = new Logger(PermissionsMiddleware.name);

  constructor(
    @Inject(PERMISSION_ALS_NAME)
    private readonly als: AsyncLocalStorage<PermissionContext>,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        (
          req: FastifyRequest["raw"],
          _: FastifyReply["raw"],
          next: () => void,
        ) => {
          const store: PermissionContext = {
            permissions: [],
          };

          const userId = req.headers["x-user-id"];

          if (userId) {
            store.permissions.push(Permission.Update);
          }

          this.als.run(store, () => next());
        },
      )
      .forRoutes("*");
  }
}
