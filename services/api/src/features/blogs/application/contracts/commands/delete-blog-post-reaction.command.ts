import { IsUUID } from "class-validator";

export class DeleteBlogPostReactionCommand {
  @IsUUID()
  reactionId!: string;
}
