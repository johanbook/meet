import { Body, Controller, Delete, Post, Query } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CreateBlogPostCommentReactionCommand } from "../../application/contracts/commands/create-blog-post-comment-reaction.command";
import { DeleteBlogPostCommentReactionCommand } from "../../application/contracts/commands/delete-blog-post-comment-reaction.command";

@Controller("blogs/comments/reactions")
@ApiTags("blogs")
export class BlogCommentReactionsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createBlogPostCommentReaction(
    @Body() command: CreateBlogPostCommentReactionCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Delete()
  async deleteBlogPostCommentReaction(
    @Query() command: DeleteBlogPostCommentReactionCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
