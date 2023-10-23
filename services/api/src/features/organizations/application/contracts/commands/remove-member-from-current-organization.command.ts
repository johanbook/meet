import { Type } from "class-transformer";
import { IsPositive } from "class-validator";

export class RemoveMemberFromCurrentOrganizationCommand {
  @Type(() => Number)
  @IsPositive()
  membershipId!: number;
}
