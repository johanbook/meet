import { Type } from "class-transformer";
import { Length, IsString, ValidateNested } from "class-validator";

import { DateIsBefore } from "src/core/validation/custom-validators/date-is-before.validator";

import { Location } from "../dtos/location.dto";

export class CreateProfileCommand {
  @Type(() => Date)
  @DateIsBefore({ years: 18 })
  public readonly dateOfBirth!: Date;

  @IsString()
  @Length(0, 1024)
  public readonly description!: string;

  @IsString()
  @Length(1, 128)
  public readonly name!: string;

  @Type(() => Location)
  @ValidateNested()
  public readonly recentLocation!: Location;
}
