import { IsUUID } from "class-validator";

export class GetBlogPostQuery {
  @IsUUID()
  id!: string;
}
