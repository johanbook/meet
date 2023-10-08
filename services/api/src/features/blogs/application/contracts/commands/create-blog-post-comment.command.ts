import { IsUUID, Length } from "class-validator";

export class CreateBlogPostCommentCommand {
  @IsUUID()
  blogPostId!: string;

  @Length(1, 2048)
  content!: string;
}
