import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map, mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { PhotoService } from "src/core/photos";
import { CurrentProfileService } from "src/core/profiles";
import { QueryService } from "src/core/query";
import { BlogPost } from "src/features/blogs/infrastructure/entities/blog-post.entity";
import { sortByField } from "src/utils/sorting.helper";

import { BlogPostCommentReactionDetails } from "../../contracts/dtos/blog-post-comment-reactions.dto";
import { BlogPostCommentDetails } from "../../contracts/dtos/blog-post-comment.dto";
import { BlogPostDetails } from "../../contracts/dtos/blog-post-detail.dto";
import { BlogPostPhotoDetails } from "../../contracts/dtos/blog-post-photo.dto";
import { BlogPostProfileDetails } from "../../contracts/dtos/blog-post-profile.dto";
import { BlogPostReactionDetails } from "../../contracts/dtos/blog-post-reactions.dto";
import { GetBlogPostListQuery } from "../../contracts/queries/get-blog-post-list.query";

@QueryHandler(GetBlogPostListQuery)
export class GetBlogPostListHandler
  implements IQueryHandler<GetBlogPostListQuery, BlogPostDetails[]>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly photoService: PhotoService,
    private readonly queryService: QueryService<BlogPost>,
  ) {}

  async execute(query: GetBlogPostListQuery) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const foundBlogPosts = await this.queryService.find(this.blogPosts, {
      default: {
        order: {
          createdAt: "desc",
        },
      },
      query,
      required: {
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
          organizationId: currentOrganizationId,
        },
      },
    });

    return mapArray(BlogPostDetails, foundBlogPosts, (post) => ({
      comments: mapArray(
        BlogPostCommentDetails,
        sortByField(post.comments, (comment) => comment.createdAt),
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
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      id: post.id,
      ownedByCurrentUser: post.profileId === currentProfileId,
      photos: mapArray(BlogPostPhotoDetails, post.photos, (photo) => ({
        description: photo.description,
        id: photo.id,
        url: this.photoService.getUrl(photo, "blog-post-photo"),
      })),
      profile: map(BlogPostProfileDetails, {
        id: post.profile.id,
        imageUrl:
          post.profile.profilePhoto &&
          this.photoService.getUrl(post.profile.profilePhoto, "profile-photo"),
        name: post.profile.name,
      }),
      reactions: map(BlogPostReactionDetails, {
        count: post.reactions.length,
        currentProfileReactionId: post.reactions.find(
          (reaction) => reaction.profileId === currentProfileId,
        )?.id,
        names: post.reactions.map((reaction) => reaction.profile.name),
      }),
    }));
  }
}
