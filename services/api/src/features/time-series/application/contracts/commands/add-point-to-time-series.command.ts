import { IsNumber, IsString, IsUUID } from "class-validator";

import { Trim } from "src/core/validation";

export class AddPointToTimeSeriesCommand {
  @IsString()
  public readonly description!: string;

  @IsString()
  @Trim()
  public readonly label!: string;

  @IsUUID()
  public readonly timeSeriesId!: string;

  @IsNumber()
  public readonly value!: number;
}
