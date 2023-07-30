import { IsBoolean } from "class-validator";

export class UpdateSettingsCommand {
  @IsBoolean()
  darkmode!: boolean;
}
