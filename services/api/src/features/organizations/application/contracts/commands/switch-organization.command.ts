import { IsPositive } from "class-validator";

export class SwitchOrganizationCommand {
  @IsPositive()
  organizationId!: number;
}
