import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthorizationService } from "src/core/authorization";

import { BlogPostReaction } from "../../../infrastructure/entities/blog-post-reaction.entity";
import { DeleteBlogPostReactionCommand } from "../../contracts/commands/delete-blog-post-reaction.command";

@CommandHandler(DeleteBlogPostReactionCommand)
export class DeleteBlogPostReactionHandler
  implements ICommandHandler<DeleteBlogPostReactionCommand, void>
{
  constructor(
    private readonly authorizationService: AuthorizationService,
    @InjectRepository(BlogPostReaction)
    private readonly blogPostReactions: Repository<BlogPostReaction>,
  ) {}

  async execute(command: DeleteBlogPostReactionCommand) {
    const blogPostReaction = await this.blogPostReactions.findOne({
      where: {
        id: command.reactionId,
      },
    });

    if (!blogPostReaction) {
      throw new NotFoundException("Blog post reaction not found");
    }

    await this.authorizationService.authorizeOwnerOrAdmin(blogPostReaction);

    await this.blogPostReactions.remove(blogPostReaction);
  }
}
