import {
  IsAlpha,
  Length,
  IsString,
  ValidateNested,
  IsDate,
} from "class-validator";

import { Location } from "./location.dto";

export class CreateProfileCommand {
  @IsDate()
  public readonly dateOfBirth!: Date;

  @IsString()
  @Length(0, 1024)
  public readonly description!: string;

  @IsAlpha()
  @Length(0, 128)
  public readonly name!: string;

  @ValidateNested()
  public readonly recentLocation!: Location;
}
