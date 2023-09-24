import { IsEnum, IsPositive } from "class-validator";

import { OrganizationRole } from "src/core/authorization";

export class UpdateMemberRoleCommand {
  @IsPositive()
  id!: number;

  @IsEnum(OrganizationRole)
  role!: OrganizationRole;
}
