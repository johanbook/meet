import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateBookingCommand {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsDate()
  @Type(() => Date)
  startTime!: Date;

  @IsDate()
  @Type(() => Date)
  endTime!: Date;
}
