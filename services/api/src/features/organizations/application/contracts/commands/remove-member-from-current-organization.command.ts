import { IsPositive } from "class-validator";

export class RemoveMemberFromCurrentOrganizationCommand {
  @IsPositive()
  membershipId!: number;
}
