import { IsEnum, IsPositive } from "class-validator";

import { OrganizationMembershipRole } from "../../../infrastructure/entities/organization-membership.entity";

export class UpdateMemberRoleCommand {
  @IsPositive()
  id!: number;

  @IsEnum(OrganizationMembershipRole)
  role!: OrganizationMembershipRole;
}
