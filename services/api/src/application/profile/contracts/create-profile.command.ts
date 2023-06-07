import { Type } from "class-transformer";
import { IsAlpha, Length, IsString, ValidateNested } from "class-validator";

import { DateIsBefore } from "src/core/validation/custom-validators/date-is-before.validator";

import { Location } from "./location.dto";

export class CreateProfileCommand {
  @Type(() => Date)
  @DateIsBefore({ years: 18 })
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
