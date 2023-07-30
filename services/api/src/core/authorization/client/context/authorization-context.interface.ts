import { IPermission } from "../../permission.interface";

export interface AuthorizationContext {
  permissions: IPermission[];
}
