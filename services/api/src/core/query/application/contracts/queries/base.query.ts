import { IsOptional, Min } from "class-validator";

export class BaseQuery {
  @IsOptional()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Min(0)
  top?: number;
}
