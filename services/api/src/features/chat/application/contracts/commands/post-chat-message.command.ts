import { IsString, IsUUID, Length } from "class-validator";

export class PostChatMessageCommand {
  @IsUUID()
  public readonly conversationId!: string;

  @IsString()
  @Length(1, 1024)
  public readonly message!: string;
}
