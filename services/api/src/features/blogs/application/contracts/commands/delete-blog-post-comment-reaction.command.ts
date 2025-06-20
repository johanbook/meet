import { IsUUID } from "class-validator";

export class DeleteBlogPostCommentReactionCommand {
  @IsUUID()
  reactionId!: string;
}
