import { IsPositive } from "class-validator";

export class AddMemberToOrganizationCommand {
  @IsPositive()
  profileId!: number;
}
