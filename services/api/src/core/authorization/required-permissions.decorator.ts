import { UnauthorizedException } from "@nestjs/common";

import { authorize } from "./authorizer";
import { Permission } from "./permissions.enum";

export const RequirePermissions = (requiredPermissions: Permission[]) => {
  return function (constructor: any) {
    const orignalExecutor = constructor.prototype.execute;

    constructor.prototype.execute = async function (...props: any) {
      const isAuthorized = authorize(requiredPermissions);

      if (isAuthorized) {
        throw new UnauthorizedException();
      }

      orignalExecutor.apply(this, props);
    };
  };
};
