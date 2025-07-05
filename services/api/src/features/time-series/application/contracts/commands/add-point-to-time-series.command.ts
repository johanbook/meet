import { IsNumber, IsString, IsUUID } from "class-validator";

export class AddPointToTimeSeriesCommand {
  @IsString()
  public readonly description!: string;

  @IsString()
  public readonly label!: string;

  @IsUUID()
  public readonly timeSeriesId!: string;

  @IsNumber()
  public readonly value!: number;
}
