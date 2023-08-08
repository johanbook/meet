import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentOrganizationService } from "src/features/organizations";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostCommand } from "../../contracts/commands/create-blog-post.command";

@CommandHandler(CreateBlogPostCommand)
export class CreateBlogPostHandler
  implements ICommandHandler<CreateBlogPostCommand, void>
{
  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly currentOrganizationService: CurrentOrganizationService,
  ) {}

  async execute(command: CreateBlogPostCommand) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const blogPost = new BlogPost();
    blogPost.content = command.content;
    blogPost.organizationId = currentOrganizationId;

    await this.blogPostService.saveBlogPost(blogPost);
  }
}
