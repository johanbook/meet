import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CreateBlogPostCommentCommand } from "../../application/contracts/commands/create-blog-post-comment.command";

@Controller("blogs/comments")
@ApiTags("blogs")
export class BlogCommentsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createBlogPostComment(
    @Body() command: CreateBlogPostCommentCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
