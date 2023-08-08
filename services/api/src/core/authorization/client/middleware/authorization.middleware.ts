import { Inject, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FastifyRequest, FastifyReply } from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";

import { Logger } from "src/core/logging";
import { AlsModule } from "src/core/request-context/als.module";
import { RequestContextModule } from "src/core/request-context/request-context.module";

import { PermissionsService } from "../../application/permissions.service";
import { Permission } from "../../infrastructure/entitities/permission.entity";
import {
  AUTHORIZATION_ALS_KEY,
  AuthorizationAlsModule,
} from "../context/authorization-als.module";
import { AuthorizationContext } from "../context/authorization-context.interface";

@Module({
  imports: [
    AlsModule,
    AuthorizationAlsModule,
    RequestContextModule,
    TypeOrmModule.forFeature([Permission]),
  ],
  providers: [PermissionsService],
})
export class AuthorizationMiddleware implements NestModule {
  private logger = new Logger(AuthorizationMiddleware.name);

  constructor(
    @Inject(AUTHORIZATION_ALS_KEY)
    private readonly als: AsyncLocalStorage<AuthorizationContext>,
    private readonly permissionsService: PermissionsService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        async (
          _: FastifyRequest["raw"],
          __: FastifyReply["raw"],
          next: () => void,
        ) => {
          const permissions = await this.permissionsService.fetchPermissions();

          this.logger.trace({ msg: "Adding persmissions", permissions });

          const store: AuthorizationContext = {
            permissions,
          };

          this.als.run(store, () => next());
        },
      )
      .forRoutes("*");
  }
}
