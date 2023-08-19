import { Type } from "class-transformer";
import { IsPositive } from "class-validator";

export class GetChatMessagesQuery {
  @Type(() => Number)
  @IsPositive()
  public readonly profileId!: number;
}
