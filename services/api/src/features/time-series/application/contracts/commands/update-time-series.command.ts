import { IsUUID, Length } from "class-validator";

export class UpdateTimeSeriesCommand {
  @IsUUID()
  id!: string;

  @Length(1, 256)
  name!: string;

  @Length(1, 2048)
  description!: string;
}
