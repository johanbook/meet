import { Logger } from "src/infrastructure/logger.service";

import { PERMISSIONS_CONTEXT_ALS } from "./client/context/permission-als.module";
import { Permission } from "./permissions.enum";

const logger = new Logger("authorize");

export function authorize(requiredPermissionss: Permission[]): boolean {
  const store = PERMISSIONS_CONTEXT_ALS.getStore();

  if (!store) {
    throw new Error("Unable to authorize due to missing store");
  }

  const currentPermissions = store.permissions;

  const isAuthorized = requiredPermissionss.every((requiredPermissions) =>
    currentPermissions.includes(requiredPermissions),
  );

  if (isAuthorized) {
    logger.trace("Authorization granted");
    return true;
  }

  logger.warn({
    msg: "Failed authorizion",
    currentPermissions,
    requiredPermissionss,
  });

  return false;
}
