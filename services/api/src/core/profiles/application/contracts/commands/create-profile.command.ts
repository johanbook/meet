import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsString, Length, ValidateNested } from "class-validator";

import { BinaryFile } from "src/core/multipart";
import { IStorableObject } from "src/core/object-storage";
import { DateIsBefore } from "src/core/validation/custom-validators/date-is-before.validator";

import { Location } from "../dtos/location.dto";

export class CreateProfileCommand {
  @Type(() => Date)
  @DateIsBefore({ years: 14 })
  public readonly dateOfBirth!: Date;

  @IsString()
  @Length(0, 1024)
  public readonly description!: string;

  @IsString()
  @Length(1, 128)
  public readonly name!: string;

  @Optional()
  @BinaryFile()
  public readonly photo?: IStorableObject;

  @Optional()
  @Type(() => Location)
  @ValidateNested()
  public readonly recentLocation?: Location;
}
