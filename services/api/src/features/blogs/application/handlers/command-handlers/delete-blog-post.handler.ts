import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthorizationService } from "src/core/authorization";
import { EntityNotFoundError } from "src/core/error-handling";
import { PhotoService } from "src/core/photos";

import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { DeleteBlogPostCommand } from "../../contracts/commands/delete-blog-post.command";

@CommandHandler(DeleteBlogPostCommand)
export class DeleteBlogPostHandler implements ICommandHandler<
  DeleteBlogPostCommand,
  void
> {
  constructor(
    private readonly authorizationService: AuthorizationService,
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly photoService: PhotoService,
  ) {}

  async execute(command: DeleteBlogPostCommand) {
    const blogPost = await this.blogPosts.findOne({
      relations: {
        photos: true,
      },
      where: {
        id: command.id,
      },
    });

    if (!blogPost) {
      throw new EntityNotFoundError(BlogPost);
    }

    await this.authorizationService.authorizeOwnerOrAdmin(blogPost);

    await this.deleteBlogPostPhotos(blogPost);

    await this.blogPosts.remove(blogPost);
  }

  private async deleteBlogPostPhotos(blogPost: BlogPost): Promise<BlogPost> {
    for (const photo of blogPost.photos) {
      await this.photoService.removePhoto(photo, "blog-post-photo");
    }

    blogPost.photos = [];

    return blogPost;
  }
}
