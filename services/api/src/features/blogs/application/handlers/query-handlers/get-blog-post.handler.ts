import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityNotFoundError } from "src/core/error-handling";
import { map, mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { PhotoService } from "src/core/photos";
import { CurrentProfileService } from "src/core/profiles";
import { BlogPost } from "src/features/blogs/infrastructure/entities/blog-post.entity";
import { sortByField } from "src/utils/sorting.helper";

import { BlogPostCommentReactionDetails } from "../../contracts/dtos/blog-post-comment-reactions.dto";
import { BlogPostCommentDetails } from "../../contracts/dtos/blog-post-comment.dto";
import { BlogPostDetails } from "../../contracts/dtos/blog-post-detail.dto";
import { BlogPostPhotoDetails } from "../../contracts/dtos/blog-post-photo.dto";
import { BlogPostProfileDetails } from "../../contracts/dtos/blog-post-profile.dto";
import { BlogPostReactionDetails } from "../../contracts/dtos/blog-post-reactions.dto";
import { GetBlogPostQuery } from "../../contracts/queries/get-blog-post.query";

@QueryHandler(GetBlogPostQuery)
export class GetBlogPostHandler implements IQueryHandler<
  GetBlogPostQuery,
  BlogPostDetails
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly photoService: PhotoService,
  ) {}

  async execute(query: GetBlogPostQuery) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const blogPost = await this.blogPosts.findOne({
      relations: {
        comments: {
          profile: {
            profilePhoto: true,
          },
          reactions: {
            profile: true,
          },
        },
        photos: true,
        profile: {
          profilePhoto: true,
        },
        reactions: {
          profile: true,
        },
      },
      where: {
        id: query.id,
        organizationId: currentOrganizationId,
      },
    });

    if (!blogPost) {
      throw new EntityNotFoundError(BlogPost);
    }

    return map(BlogPostDetails, {
      comments: mapArray(
        BlogPostCommentDetails,
        sortByField(blogPost.comments, (comment) => comment.createdAt),
        (comment) => ({
          content: comment.content,
          createdAt: comment.createdAt.toISOString(),
          id: comment.id,
          profile: map(BlogPostProfileDetails, {
            id: comment.profile.id,
            imageUrl:
              comment.profile.profilePhoto &&
              this.photoService.getUrl(
                comment.profile.profilePhoto,
                "profile-photo",
              ),
            name: comment.profile.name,
          }),
          reactions: map(BlogPostCommentReactionDetails, {
            count: comment.reactions.length,
            currentProfileReactionId: comment.reactions.find(
              (reaction) => reaction.profileId === currentProfileId,
            )?.id,
            names: comment.reactions.map((reaction) => reaction.profile.name),
          }),
        }),
      ),
      content: blogPost.content,
      createdAt: blogPost.createdAt.toISOString(),
      id: blogPost.id,
      ownedByCurrentUser: blogPost.profileId === currentProfileId,
      photos: mapArray(BlogPostPhotoDetails, blogPost.photos, (photo) => ({
        description: photo.description,
        id: photo.id,
        url: this.photoService.getUrl(photo, "blog-post-photo"),
      })),
      profile: map(BlogPostProfileDetails, {
        id: blogPost.profile.id,
        imageUrl:
          blogPost.profile.profilePhoto &&
          this.photoService.getUrl(
            blogPost.profile.profilePhoto,
            "profile-photo",
          ),
        name: blogPost.profile.name,
      }),
      reactions: map(BlogPostReactionDetails, {
        count: blogPost.reactions.length,
        currentProfileReactionId: blogPost.reactions.find(
          (reaction) => reaction.profileId === currentProfileId,
        )?.id,
        names: blogPost.reactions.map((reaction) => reaction.profile.name),
      }),
    });
  }
}
