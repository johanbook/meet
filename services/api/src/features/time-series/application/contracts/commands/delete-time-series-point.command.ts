import { IsUUID } from "class-validator";

export class DeleteTimeSeriesPointCommand {
  @IsUUID()
  public readonly pointId!: string;

  @IsUUID()
  public readonly timeSeriesId!: string;
}
