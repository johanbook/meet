import { Module } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

import { PermissionContext } from "./permission-context.interface";

export const PERMISSIONS_CONTEXT_ALS =
  new AsyncLocalStorage<PermissionContext>();

export const PERMISSION_ALS_NAME = "permissions-context-als";

@Module({
  providers: [
    {
      provide: PERMISSION_ALS_NAME,
      useValue: PERMISSIONS_CONTEXT_ALS,
    },
  ],
  exports: [PERMISSION_ALS_NAME],
})
export class PermissionAlsModule {}
