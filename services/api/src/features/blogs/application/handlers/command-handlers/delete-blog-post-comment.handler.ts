import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthorizationService } from "src/core/authorization";
import { EntityNotFoundError } from "src/core/error-handling";

import { BlogPostComment } from "../../../infrastructure/entities/blog-post-comment.entity";
import { DeleteBlogPostCommentCommand } from "../../contracts/commands/delete-blog-post-comment.command";

@CommandHandler(DeleteBlogPostCommentCommand)
export class DeleteBlogPostCommentHandler
  implements ICommandHandler<DeleteBlogPostCommentCommand, void>
{
  constructor(
    private readonly authorizationService: AuthorizationService,
    @InjectRepository(BlogPostComment)
    private readonly blogPostComments: Repository<BlogPostComment>,
  ) {}

  async execute(command: DeleteBlogPostCommentCommand) {
    const blogPostComment = await this.blogPostComments.findOne({
      where: {
        id: command.id,
      },
    });

    if (!blogPostComment) {
      throw new EntityNotFoundError(BlogPostComment);
    }

    await this.authorizationService.authorizeOwnerOrAdmin(blogPostComment);

    await this.blogPostComments.remove(blogPostComment);
  }
}
