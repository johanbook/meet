import { Length } from "class-validator";

export class CreateTimeSeriesCommand {
  @Length(1, 256)
  name!: string;

  @Length(1, 2048)
  description!: string;
}
