import { IsDefined, IsOptional, IsUUID } from "class-validator";

import { BinaryFileArray } from "src/core/multipart";
import { IStorableObject } from "src/core/object-storage";

export class AddPhotosToExistingBlogPostCommand {
  @IsOptional()
  @IsDefined()
  descriptions?: string[];

  @IsUUID()
  id!: string;

  @IsOptional()
  @IsDefined()
  @BinaryFileArray()
  // TODO: Temporary fix
  photos?: IStorableObject | IStorableObject[];
}
