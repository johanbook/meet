import {
  IsBoolean,
  IsLocale,
  IsOptional,
  IsUUID,
  Length,
} from "class-validator";

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

  @IsOptional()
  @IsUUID()
  parentUuid?: string;
}
