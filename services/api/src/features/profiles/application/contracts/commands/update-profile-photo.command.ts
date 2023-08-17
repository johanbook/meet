import { IsDefined } from "class-validator";

import { BinaryFile } from "src/core/multipart";
import { IStorableObject } from "src/core/object-storage";

export class UpdateProfilePhotoCommand {
  @IsDefined()
  @BinaryFile()
  photo!: IStorableObject;
}
