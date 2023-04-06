import { ApiHideProperty } from "@nestjs/swagger";
import { IsAlpha, Length, IsString, ValidateNested } from "class-validator";

import { Location } from "./location.dto";

export class CreateProfileCommand {
  @IsString()
  @Length(0, 1024)
  public readonly description!: string;

  @IsAlpha()
  @Length(0, 128)
  public readonly name!: string;

  @ValidateNested()
  public readonly recentLocation!: Location;

  @ApiHideProperty()
  public userId!: string;
}
