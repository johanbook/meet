import { Module } from "@nestjs/common";

import { PermissionAlsModule } from "./client/context/permission-als.module";
import { PermissionsMiddleware } from "./client/context/permission.middleware";
import { PermissionsService } from "./client/context/permissions.service";
import { PermissionsController } from "./client/controllers/permissions.controller";

@Module({
  exports: [PermissionsService, PermissionAlsModule],
  imports: [PermissionAlsModule, PermissionsMiddleware],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class AuthorizationModule {}
