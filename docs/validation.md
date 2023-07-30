# Validation

The software system is intended to validate all incoming requests. It is
possible to configure the system to also perform validation on responses,
however, that is not implemented by default due to its performance impact and
the assumption of data integrity in the system.

## Guide

The system uses [class-validator](https://www.npmjs.com/package/class-validator)
for performing validation and
[class-transformer](https://www.npmjs.com/package/class-transformer) to
transforming received payloads to the appropriate types. This duo is used due to
them working out of the box with Nestjs.

Validation is set up a command/query/event level, like so

```ts
import { Type } from "class-transformer";
import { IsAlpha, Length, IsString, ValidateNested } from "class-validator";

import { DateIsBefore } from "src/core/validation/custom-validators/date-is-before.validator";

import { Location } from "../dtos/location.dto";

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

  @Type(() => Location)
  @ValidateNested()
  public readonly recentLocation!: Location;
}
```
