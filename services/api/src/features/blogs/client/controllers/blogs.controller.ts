import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { Multipart } from "src/core/multipart";

import { CreateBlogPostCommand } from "../../application/contracts/commands/create-blog-post.command";
import { DeleteBlogPostCommand } from "../../application/contracts/commands/delete-blog-post.command";
import { UpdateBlogPostCommand } from "../../application/contracts/commands/update-blog-post.command";
import { BlogPhotoDetails } from "../../application/contracts/dtos/blog-photo.dto";
import { BlogPostDetails } from "../../application/contracts/dtos/blog-post-detail.dto";
import { GetBlogPhotoListQuery } from "../../application/contracts/queries/get-blog-photo-list.query";
import { GetBlogPostListQuery } from "../../application/contracts/queries/get-blog-post-list.query";
import { GetBlogPostQuery } from "../../application/contracts/queries/get-blog-post.query";

@Controller("blogs")
@ApiTags("blogs")
export class BlogsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getBlogPosts(
    @Query() query: GetBlogPostListQuery,
  ): Promise<BlogPostDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Get("byId")
  async getBlogPost(
    @Query() query: GetBlogPostQuery,
  ): Promise<BlogPostDetails> {
    return await this.queryBus.execute(query);
  }

  @Post()
  @Multipart()
  async createBlogPost(@Body() command: CreateBlogPostCommand): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Patch()
  async updateBlogPost(@Body() command: UpdateBlogPostCommand): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Delete()
  async deletelogPost(@Body() command: DeleteBlogPostCommand): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Get("photos")
  async getBlogPhotoList(
    @Query() query: GetBlogPhotoListQuery,
  ): Promise<BlogPhotoDetails[]> {
    return await this.queryBus.execute(query);
  }
}
