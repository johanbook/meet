import { IsUUID } from "class-validator";

export class GetTimeSeriesQuery {
  @IsUUID()
  id!: string;
}
