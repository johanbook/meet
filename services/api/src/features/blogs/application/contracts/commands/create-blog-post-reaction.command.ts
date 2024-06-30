import { IsUUID, Length } from "class-validator";

export class CreateBlogPostReactionCommand {
  @IsUUID()
  blogPostId!: string;

  @Length(1, 2048)
  reaction!: string;
}
