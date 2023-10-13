import { IsUUID } from "class-validator";

export class DeleteBlogPostCommentCommand {
  @IsUUID()
  id!: string;
}
