import { IsPositive, IsString, Length } from "class-validator";

export class PostChatMessageCommand {
  @IsString()
  @Length(1, 1024)
  public readonly message!: string;

  @IsPositive()
  public readonly profileId!: number;
}
