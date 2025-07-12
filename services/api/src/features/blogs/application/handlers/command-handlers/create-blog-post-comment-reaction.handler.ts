import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityNotFoundError } from "src/core/error-handling";
import { CurrentOrganizationService } from "src/core/organizations";
import { CurrentProfileService } from "src/core/profiles";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPostCommentReaction } from "../../../infrastructure/entities/blog-post-comment-reaction.entity";
import { BlogPostComment } from "../../../infrastructure/entities/blog-post-comment.entity";
import { CreateBlogPostCommentReactionCommand } from "../../contracts/commands/create-blog-post-comment-reaction.command";

@CommandHandler(CreateBlogPostCommentReactionCommand)
export class CreateBlogPostCommentReactionHandler
  implements ICommandHandler<CreateBlogPostCommentReactionCommand, void>
{
  constructor(
    @InjectRepository(BlogPostComment)
    private readonly blogPostComments: Repository<BlogPostComment>,
    private readonly blogPostService: BlogPostService,
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
  ) {}

  async execute(command: CreateBlogPostCommentReactionCommand) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const blogPostComment = await this.blogPostComments.findOne({
      relations: {
        blogPost: true,
        reactions: true,
      },
      where: {
        id: command.blogPostCommentId,
        blogPost: {
          organizationId: currentOrganizationId,
        },
      },
    });

    if (!blogPostComment) {
      throw new EntityNotFoundError(BlogPostComment);
    }

    const blogPostCommentReaction = new BlogPostCommentReaction();
    blogPostCommentReaction.blogPostCommentId = blogPostComment.id;
    blogPostCommentReaction.reaction = command.reaction;
    blogPostCommentReaction.profileId = currentProfileId;

    await this.blogPostService.addReactionToBlogPostComment(
      blogPostCommentReaction,
      blogPostComment,
    );
  }
}
