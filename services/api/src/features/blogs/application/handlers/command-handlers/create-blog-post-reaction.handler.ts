import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentOrganizationService } from "src/core/organizations";
import { CurrentProfileService } from "src/core/profiles";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPostReaction } from "../../../infrastructure/entities/blog-post-reaction.entity";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostReactionCommand } from "../../contracts/commands/create-blog-post-reaction.command";

@CommandHandler(CreateBlogPostReactionCommand)
export class CreateBlogPostReactionHandler
  implements ICommandHandler<CreateBlogPostReactionCommand, void>
{
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly blogPostService: BlogPostService,
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
  ) {}

  async execute(command: CreateBlogPostReactionCommand) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const blogPost = await this.blogPosts.findOne({
      relations: {
        reactions: true,
      },
      where: {
        id: command.blogPostId,
        organizationId: currentOrganizationId,
      },
    });

    if (!blogPost) {
      throw new NotFoundException("Blog post not found");
    }

    const blogPostReaction = new BlogPostReaction();
    blogPostReaction.reaction = command.reaction;
    blogPostReaction.profileId = currentProfileId;

    await this.blogPostService.addReactionToBlogPost(
      blogPostReaction,
      blogPost,
    );
  }
}
