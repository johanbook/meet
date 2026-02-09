import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityNotFoundError } from "src/core/error-handling";

import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { UpdateBlogPostCommand } from "../../contracts/commands/update-blog-post.command";

@CommandHandler(UpdateBlogPostCommand)
export class UpdateBlogPostHandler implements ICommandHandler<
  UpdateBlogPostCommand,
  void
> {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
  ) {}

  async execute(command: UpdateBlogPostCommand) {
    const blogPost = await this.blogPosts.findOne({
      where: { id: command.id },
    });

    if (!blogPost) {
      throw new EntityNotFoundError(BlogPost);
    }

    blogPost.content = command.content;

    await this.blogPosts.save(blogPost);
  }
}
