import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateTimeSeriesPointCommand {
  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsString()
  @IsOptional()
  public readonly label?: string;

  @IsUUID()
  public readonly pointId!: string;

  @IsUUID()
  public readonly timeSeriesId!: string;

  @IsNumber()
  @IsOptional()
  public readonly value?: number;
}
