import { IsUUID, Length } from "class-validator";

export class UpdateBlogPostCommand {
  @IsUUID()
  id!: string;

  @Length(1, 2048)
  content!: string;
}
