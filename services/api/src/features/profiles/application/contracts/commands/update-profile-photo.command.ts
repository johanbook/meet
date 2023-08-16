import { IsDefined } from "class-validator";

import { BinaryFileArray } from "src/core/multipart";
import { IStorableObject } from "src/core/object-storage";

export class UpdateProfilePhotoCommand {
  @IsDefined()
  @BinaryFileArray()
  photo!: IStorableObject;
}
