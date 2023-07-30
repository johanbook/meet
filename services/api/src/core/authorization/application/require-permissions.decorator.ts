import { UnauthorizedException } from "@nestjs/common";
import { ICommand, ICommandHandler } from "@nestjs/cqrs";

import { Authorizer } from "../authorizer";
import { IPermission } from "../permission.interface";

export type Constructor<T> = new (...props: any[]) => T;

/** Adds authorization to a command or query */
export const RequirePermissions = (requiredPermissions: IPermission[]) => {
  return function <T extends ICommand, V>(
    constructor: Constructor<ICommandHandler<T, V>>,
  ) {
    const orignalExecutor = constructor.prototype.execute;

    constructor.prototype.execute = async function (...props: any) {
      const isAuthorized = Authorizer.authorize(requiredPermissions);

      if (isAuthorized) {
        throw new UnauthorizedException();
      }

      orignalExecutor.apply(this, props);
    };
  };
};
