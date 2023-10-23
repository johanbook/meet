import { Body, Controller, Delete, Post, Query } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CreateBlogPostCommentCommand } from "../../application/contracts/commands/create-blog-post-comment.command";
import { DeleteBlogPostCommentCommand } from "../../application/contracts/commands/delete-blog-post-comment.command";

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

  @Delete()
  async deleteBlogPostComment(
    @Query() command: DeleteBlogPostCommentCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
