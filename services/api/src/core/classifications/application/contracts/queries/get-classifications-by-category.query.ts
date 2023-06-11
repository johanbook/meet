import { IsBoolean, IsLocale, IsOptional, Length } from "class-validator";

export class GetClassificationsByCategoryQuery {
  @Length(1, 255)
  category!: string;

  @IsOptional()
  @IsBoolean()
  includeManual?: boolean;

  @IsOptional()
  @IsBoolean()
  includeObsolete?: boolean;

  @IsOptional()
  @IsLocale()
  locale?: string;
}
