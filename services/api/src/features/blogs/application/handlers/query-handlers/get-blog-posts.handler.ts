import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { QueryService } from "src/core/query";
import { BlogPost } from "src/features/blogs/infrastructure/entities/blog-post.entity";
import { CurrentOrganizationService } from "src/features/organizations";

import { BlogPostDetails } from "../../contracts/dtos/blog-post-detail.dto";
import { GetBlogPostsQuery } from "../../contracts/queries/get-blog-posts.query";

@QueryHandler(GetBlogPostsQuery)
export class GetBlogPostsHandler
  implements IQueryHandler<GetBlogPostsQuery, BlogPostDetails[]>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly queryService: QueryService<BlogPost>,
  ) {}

  async execute(query: GetBlogPostsQuery) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const foundBlogPosts = await this.queryService.find(this.blogPosts, {
      query,
      required: { where: { organizationId: currentOrganizationId } },
    });

    return mapArray(BlogPostDetails, foundBlogPosts, (post) => ({
      content: post.content,
    }));
  }
}
