import { IsUUID } from "class-validator";

export class DeleteBlogPostCommand {
  @IsUUID()
  id!: string;
}
