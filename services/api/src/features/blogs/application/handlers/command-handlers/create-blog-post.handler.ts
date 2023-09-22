import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { IStorableObject } from "src/core/object-storage";
import { PhotoService } from "src/core/photos";
import { BlogPostPhoto } from "src/features/blogs/infrastructure/entities/blog-post-photo.entity";
import { CurrentOrganizationService } from "src/features/organizations";
import { CurrentProfileService } from "src/features/profiles";

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
    private readonly currentProfileService: CurrentProfileService,
    private readonly photoService: PhotoService,
  ) {}

  async execute(command: CreateBlogPostCommand) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const blogPost = new BlogPost();
    blogPost.content = command.content;
    blogPost.organizationId = currentOrganizationId;
    blogPost.profileId = currentProfileId;

    if (command.photos) {
      await this.addPhotos(
        blogPost,
        Array.isArray(command.photos) ? command.photos : [command.photos],
        currentProfileId,
      );
    }

    await this.blogPostService.createBlogPost(blogPost);
  }

  private async addPhotos(
    blogPost: BlogPost,
    photos: IStorableObject[],
    profileId: number,
  ): Promise<void> {
    const blogPostPhotos: BlogPostPhoto[] = [];

    for (const binary of photos) {
      const resizedPhoto = await this.photoService.resize(binary as Buffer, {
        height: 500,
      });

      const blogPostPhoto = await this.photoService.uploadPhoto(
        BlogPostPhoto,
        "blog-post-photo",
        resizedPhoto,
      );
      blogPostPhoto.profileId = profileId;
      blogPostPhotos.push(blogPostPhoto);
    }

    blogPost.photos = blogPostPhotos;
  }
}
