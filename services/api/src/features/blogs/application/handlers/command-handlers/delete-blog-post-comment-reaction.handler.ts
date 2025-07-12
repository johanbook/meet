import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthorizationService } from "src/core/authorization";
import { EntityNotFoundError } from "src/core/error-handling";

import { BlogPostCommentReaction } from "../../../infrastructure/entities/blog-post-comment-reaction.entity";
import { DeleteBlogPostCommentReactionCommand } from "../../contracts/commands/delete-blog-post-comment-reaction.command";

@CommandHandler(DeleteBlogPostCommentReactionCommand)
export class DeleteBlogPostCommentReactionHandler
  implements ICommandHandler<DeleteBlogPostCommentReactionCommand, void>
{
  constructor(
    private readonly authorizationService: AuthorizationService,
    @InjectRepository(BlogPostCommentReaction)
    private readonly blogPostCommentReactions: Repository<BlogPostCommentReaction>,
  ) {}

  async execute(command: DeleteBlogPostCommentReactionCommand) {
    const blogPostCommentReaction = await this.blogPostCommentReactions.findOne(
      {
        where: {
          id: command.reactionId,
        },
      },
    );

    if (!blogPostCommentReaction) {
      throw new EntityNotFoundError(BlogPostCommentReaction);
    }

    await this.authorizationService.authorizeOwnerOrAdmin(
      blogPostCommentReaction,
    );

    await this.blogPostCommentReactions.remove(blogPostCommentReaction);
  }
}
