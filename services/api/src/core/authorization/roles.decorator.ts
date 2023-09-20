import { SetMetadata } from "@nestjs/common";

import { OrganizationMembershipRole } from "src/features/organizations/infrastructure/entities/organization-membership.entity";

export const ROLES_KEY = "roles";
export const RequiresPermissions = (roles: OrganizationMembershipRole[]) =>
  SetMetadata(ROLES_KEY, roles);
