import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

import { Trim } from "src/core/validation";

export class UpdateTimeSeriesPointCommand {
  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsString()
  @IsOptional()
  @Trim()
  public readonly label?: string;

  @IsUUID()
  public readonly pointId!: string;

  @IsUUID()
  public readonly timeSeriesId!: string;

  @IsNumber()
  @IsOptional()
  public readonly value?: number;
}
