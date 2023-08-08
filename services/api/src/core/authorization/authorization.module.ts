import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RequestContextModule } from "src/core/request-context/request-context.module";

import { PermissionsService } from "./application/permissions.service";
import { AuthorizationAlsModule } from "./client/context/authorization-als.module";
import { PermissionsController } from "./client/controllers/permissions.controller";
import { AuthorizationMiddleware } from "./client/middleware/authorization.middleware";
import { Permission } from "./infrastructure/entitities/permission.entity";

@Module({
  controllers: [PermissionsController],
  exports: [AuthorizationAlsModule, PermissionsService],
  imports: [
    AuthorizationAlsModule,
    AuthorizationMiddleware,
    RequestContextModule,
    TypeOrmModule.forFeature([Permission]),
  ],
  providers: [PermissionsService],
})
export class AuthorizationModule {}
