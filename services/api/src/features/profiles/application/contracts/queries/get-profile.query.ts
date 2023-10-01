import { Type } from "class-transformer";
import { IsPositive } from "class-validator";

export class GetProfileQuery {
  @Type(() => Number)
  @IsPositive()
  id!: number;
}
