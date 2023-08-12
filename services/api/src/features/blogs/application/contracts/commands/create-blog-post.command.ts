import { IsDefined, IsOptional, Length } from "class-validator";

import { BinaryFileArray } from "src/core/multipart";
import { IStorableObject } from "src/core/object-storage";

export class CreateBlogPostCommand {
  @Length(1, 2048)
  content!: string;

  @IsOptional()
  @IsDefined()
  descriptions?: string[];

  @IsOptional()
  @IsDefined()
  @BinaryFileArray()
  photos?: IStorableObject[];
}
