import { Length } from "class-validator";

export class CreateBlogPostCommand {
  @Length(1, 2048)
  content!: string;
}
