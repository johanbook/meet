import { Body, Controller, Delete, Post, Put, Query } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CreateBlogPostReactionCommand } from "../../application/contracts/commands/create-blog-post-reaction.command";
import { DeleteBlogPostReactionCommand } from "../../application/contracts/commands/delete-blog-post-reaction.command";
import { UpdateBlogPostReactionCommand } from "../../application/contracts/commands/update-blog-post-reaction.command";

@Controller("blogs/reactions")
@ApiTags("blogs")
export class BlogReactionsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createBlogPostReaction(
    @Body() command: CreateBlogPostReactionCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Put()
  async updateBlogPostReaction(
    @Body() command: UpdateBlogPostReactionCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Delete()
  async deleteBlogPostReaction(
    @Query() command: DeleteBlogPostReactionCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
