import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map, mapArray } from "src/core/mapper";
import { PhotoService } from "src/core/photos";
import { QueryService } from "src/core/query";
import { BlogPost } from "src/features/blogs/infrastructure/entities/blog-post.entity";
import { CurrentOrganizationService } from "src/features/organizations";
import { CurrentProfileService } from "src/features/profiles";

import { BlogPostCommentDetails } from "../../contracts/dtos/blog-post-comment.dto";
import { BlogPostDetails } from "../../contracts/dtos/blog-post-detail.dto";
import { BlogPostPhotoDetails } from "../../contracts/dtos/blog-post-photo.dto";
import { BlogPostProfileDetails } from "../../contracts/dtos/blog-post-profile.dto";
import { GetBlogPostsQuery } from "../../contracts/queries/get-blog-posts.query";

@QueryHandler(GetBlogPostsQuery)
export class GetBlogPostsHandler
  implements IQueryHandler<GetBlogPostsQuery, BlogPostDetails[]>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly photoService: PhotoService,
    private readonly queryService: QueryService<BlogPost>,
  ) {}

  async execute(query: GetBlogPostsQuery) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const foundBlogPosts = await this.queryService.find(this.blogPosts, {
      default: {
        order: {
          createdAt: "desc",
          comments: {
            createdAt: "asc",
          },
        },
      },
      query,
      required: {
        relations: {
          comments: {
            profile: {
              profilePhoto: true,
            },
          },
          photos: true,
          profile: {
            profilePhoto: true,
          },
        },
        where: {
          organizationId: currentOrganizationId,
        },
      },
    });

    return mapArray(BlogPostDetails, foundBlogPosts, (post) => ({
      comments: mapArray(BlogPostCommentDetails, post.comments, (comment) => ({
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
      })),
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
    }));
  }
}
