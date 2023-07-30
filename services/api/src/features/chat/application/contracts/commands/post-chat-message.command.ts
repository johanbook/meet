import { IsPositive, IsString, Length } from "class-validator";

export class PostChatMessageCommand {
  @IsString()
  @Length(0, 1024)
  public readonly message!: string;

  @IsPositive()
  public readonly profileId!: number;
}
