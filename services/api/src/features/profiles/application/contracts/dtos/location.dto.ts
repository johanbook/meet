import { IsPositive } from "class-validator";

export class Location {
  @IsPositive()
  lat!: number;

  @IsPositive()
  lon!: number;
}
