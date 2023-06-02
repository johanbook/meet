import { Logger } from "src/infrastructure/logger.service";

import { ApplicationError } from "../error-handling";
import { AUTHORIZATION_ALS } from "./client/context/authorization-als.module";
import { IPermission } from "./permission.interface";

export class Authorizer {
  private static logger = new Logger("authorize");

  public static authorize(requiredPermissionss: IPermission[]): boolean {
    const store = AUTHORIZATION_ALS.getStore();

    if (!store) {
      throw new ApplicationError(
        "Authorization failed due to unable to fetch ALS store",
      );
    }

    const currentPermissions = store.permissions;

    const isAuthorized = requiredPermissionss.every((requiredPermissions) =>
      currentPermissions.includes(requiredPermissions),
    );

    if (isAuthorized) {
      this.logger.trace("Authorization granted");
      return true;
    }

    this.logger.warn({
      msg: "Authorizion not granted",
      currentPermissions,
      requiredPermissionss,
    });

    return false;
  }
}
