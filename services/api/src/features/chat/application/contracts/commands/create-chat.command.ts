import { ArrayMinSize, IsArray } from "class-validator";

import { UniqueArrayElements } from "src/core/validation/custom-validators/array-elements-are-unique.validator";

export class CreateChatCommand {
  @IsArray()
  @ArrayMinSize(1)
  @UniqueArrayElements()
  public readonly profileIds!: number[];
}
