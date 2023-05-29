import { Inject, Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

import { PERMISSION_ALS_NAME } from "./permission-als.module";
import { PermissionContext } from "./permission-context.interface";

@Injectable()
export class PermissionsService {
  constructor(
    @Inject(PERMISSION_ALS_NAME)
    private readonly als: AsyncLocalStorage<PermissionContext>,
  ) {}

  getPermissions() {
    const store = this.als.getStore();

    if (!store) {
      throw new Error("Unable to obtain store from AsyncLocalStorage");
    }

    return store.permissions;
  }
}
