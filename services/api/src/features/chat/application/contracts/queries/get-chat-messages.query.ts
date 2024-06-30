import { IsUUID } from "class-validator";

export class GetChatMessagesQuery {
  @IsUUID()
  public readonly conversationId!: string;
}
