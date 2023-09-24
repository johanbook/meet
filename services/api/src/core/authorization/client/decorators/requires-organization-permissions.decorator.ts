import { SetMetadata } from "@nestjs/common";

import { OrganizationRole } from "../../organization-roles.enum";

export const REQUIRED_ORGANIZATION_ROLES_KEY = "required-organization-roles";

export const RequiresOrganizationPermissions = (roles: OrganizationRole[]) =>
  SetMetadata(REQUIRED_ORGANIZATION_ROLES_KEY, roles);
