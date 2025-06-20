import { IsUUID, Length } from "class-validator";

export class CreateBlogPostCommentReactionCommand {
  @IsUUID()
  blogPostCommentId!: string;

  @Length(1, 8)
  reaction!: string;
}
