import { OrganizationRole } from "./organization-roles.enum";

export type IPermission = string;

export type Permissions = Record<
  string,
  | OrganizationRole[]
  | Record<string, OrganizationRole[] | Record<string, OrganizationRole[]>>
>;
