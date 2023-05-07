import { IsPositive } from "class-validator";

export class GetChatMessagesQuery {
  @IsPositive()
  public readonly profileId!: number;
}
