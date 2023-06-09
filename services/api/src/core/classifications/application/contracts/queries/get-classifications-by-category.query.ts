import { IsString, Length } from "class-validator";

export class GetClassificationsByCategoryQuery {
  @IsString()
  @Length(1, 255)
  category!: string;
}
