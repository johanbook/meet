import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { PhotoService } from "src/core/photos";
import { QueryService } from "src/core/query";

import { BlogPostPhoto } from "../../../infrastructure/entities/blog-post-photo.entity";
import { BlogPhotoDetails } from "../../contracts/dtos/blog-photo.dto";
import { GetBlogPhotoListQuery } from "../../contracts/queries/get-blog-photo-list.query";

@QueryHandler(GetBlogPhotoListQuery)
export class GetBlogPhotoListHandler implements IQueryHandler<
  GetBlogPhotoListQuery,
  BlogPhotoDetails[]
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    @InjectRepository(BlogPostPhoto)
    private readonly blogPostPhotos: Repository<BlogPostPhoto>,
    private readonly photoService: PhotoService,
    private readonly queryService: QueryService<BlogPostPhoto>,
  ) {}

  async execute(query: GetBlogPhotoListQuery) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const foundPhotos = await this.queryService.find(this.blogPostPhotos, {
      default: {
        order: {
          createdAt: "desc",
        },
      },
      query,
      required: {
        relations: {
          blogPost: true,
        },
        where: {
          blogPost: {
            organizationId: currentOrganizationId,
          },
        },
      },
    });

    return mapArray(BlogPhotoDetails, foundPhotos, (photo) => ({
      blogId: photo.blogPostId,
      createdAt: photo.createdAt,
      id: photo.id,
      url: this.photoService.getUrl(photo, "blog-post-photo"),
    }));
  }
}
