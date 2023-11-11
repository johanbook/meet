import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentOrganizationService } from "src/core/organizations";
import { CurrentProfileService } from "src/core/profiles";
import { BlogPostComment } from "src/features/blogs/infrastructure/entities/blog-post-comment.entity";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostCommentCommand } from "../../contracts/commands/create-blog-post-comment.command";

@CommandHandler(CreateBlogPostCommentCommand)
export class CreateBlogPostCommentHandler
  implements ICommandHandler<CreateBlogPostCommentCommand, void>
{
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly blogPostService: BlogPostService,
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
  ) {}

  async execute(command: CreateBlogPostCommentCommand) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const blogPost = await this.blogPosts.findOne({
      relations: {
        comments: true,
      },
      where: {
        id: command.blogPostId,
        organizationId: currentOrganizationId,
      },
    });

    if (!blogPost) {
      throw new NotFoundException(
        "Blog post not found in current organization",
      );
    }

    const blogPostComment = new BlogPostComment();
    blogPostComment.blogPostId = blogPost.id;
    blogPostComment.content = command.content;
    blogPostComment.profileId = currentProfileId;

    await this.blogPostService.addCommentToBlogPost(blogPostComment, blogPost);
  }
}
