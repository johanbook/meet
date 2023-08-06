import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrganizationModule } from "../organizations/organization.module";
import { GetBlogPostsHandler } from "./application/handlers/query-handlers/get-blog-posts.handler";
import { BlogsController } from "./client/controllers/blogs.controller";
import { BlogPostService } from "./domain/services/blog-post.service";
import { BlogPost } from "./infrastructure/entities/blog-post.entity";

@Module({
  imports: [
    CqrsModule,
    OrganizationModule,
    TypeOrmModule.forFeature([BlogPost]),
  ],
  controllers: [BlogsController],
  providers: [BlogPostService, GetBlogPostsHandler],
})
export class BlogsModule {}
