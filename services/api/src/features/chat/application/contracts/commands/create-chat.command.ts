import { IsArray, ArrayMinSize } from "class-validator";

export class CreateChatCommand {
  @IsArray()
  @ArrayMinSize(1)
  public readonly profileIds!: number[];
}
