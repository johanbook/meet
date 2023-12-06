import { IsUUID, Length } from "class-validator";

export class UpdateBlogPostReactionCommand {
  @Length(1, 2048)
  reaction!: string;

  @IsUUID()
  reactionId!: string;
}
