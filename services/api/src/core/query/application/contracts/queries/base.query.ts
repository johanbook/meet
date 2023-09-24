import { Type } from "class-transformer";
import { IsOptional, Min } from "class-validator";

export class BaseQuery {
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  top?: number;
}
