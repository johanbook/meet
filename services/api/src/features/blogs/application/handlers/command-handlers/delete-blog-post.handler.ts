import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { DeleteBlogPostCommand } from "../../contracts/commands/delete-blog-post.command";

@CommandHandler(DeleteBlogPostCommand)
export class DeleteBlogPostHandler
  implements ICommandHandler<DeleteBlogPostCommand, void>
{
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
  ) {}

  async execute(command: DeleteBlogPostCommand) {
    const blogPost = await this.blogPosts.findOne({
      where: { id: command.id },
    });

    if (!blogPost) {
      throw new NotFoundException("Blog post not found");
    }

    // TODO: Handle removal and cleanup of blog photos
    await this.blogPosts.remove(blogPost);
  }
}
