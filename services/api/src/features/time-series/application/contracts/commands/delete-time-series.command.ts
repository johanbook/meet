import { IsUUID } from "class-validator";

export class DeleteTimeSeriesCommand {
  @IsUUID()
  id!: string;
}
