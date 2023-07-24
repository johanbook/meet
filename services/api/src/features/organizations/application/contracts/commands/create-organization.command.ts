import { IsBoolean, Length } from "class-validator";

export class CreateOrganizationCommand {
  @Length(0, 128)
  name!: string;

  @IsBoolean()
  personal!: boolean;
}
