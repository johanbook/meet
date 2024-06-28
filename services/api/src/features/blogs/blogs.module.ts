import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthorizationModule } from "src/core/authorization/authorization.module";
import { NotificationModule } from "src/core/notifications/notification.module";
import { OrganizationModule } from "src/core/organizations/organization.module";
import { PhotosModule } from "src/core/photos/photos.module";
import { Profile } from "src/core/profiles";
import { ProfileModule } from "src/core/profiles/profile.module";
import { QueryModule } from "src/core/query/query.module";

import { CreateBlogPostCommentHandler } from "./application/handlers/command-handlers/create-blog-post-comment.handler";
import { CreateBlogPostReactionHandler } from "./application/handlers/command-handlers/create-blog-post-reaction.handler";
import { CreateBlogPostHandler } from "./application/handlers/command-handlers/create-blog-post.handler";
import { DeleteBlogPostCommentHandler } from "./application/handlers/command-handlers/delete-blog-post-comment.handler";
import { DeleteBlogPostReactionHandler } from "./application/handlers/command-handlers/delete-blog-post-reaction.handler";
import { DeleteBlogPostHandler } from "./application/handlers/command-handlers/delete-blog-post.handler";
import { SendBlogPostSummaryCommandHandler } from "./application/handlers/command-handlers/send-blog-post-summary.handler";
import { UpdateBlogPostHandler } from "./application/handlers/command-handlers/update-blog-post-handler";
import { NotifyOrganizationOnPostedBlogPostCommentHandler } from "./application/handlers/event-handlers/notify-organization-on-posted-blog-post-comment.handler";
import { NotifyOrganizationOnPostedBlogPostHandler } from "./application/handlers/event-handlers/notify-organization-on-posted-blog-post.handler";
import { GetBlogPostListHandler } from "./application/handlers/query-handlers/get-blog-post-list.handler";
import { GetBlogPostHandler } from "./application/handlers/query-handlers/get-blog-post.handler";
import { BlogCommentsController } from "./client/controllers/blog-comments.controller";
import { BlogReactionsController } from "./client/controllers/blog-reactions.controller";
import { BlogsController } from "./client/controllers/blogs.controller";
import { SendSummaryJobs } from "./client/jobs/send-summary.jobs";
import { BlogPostService } from "./domain/services/blog-post.service";
import { BlogPostComment } from "./infrastructure/entities/blog-post-comment.entity";
import { BlogPostPhoto } from "./infrastructure/entities/blog-post-photo.entity";
import { BlogPostReaction } from "./infrastructure/entities/blog-post-reaction.entity";
import { BlogPost } from "./infrastructure/entities/blog-post.entity";

@Module({
  imports: [
    AuthorizationModule,
    CqrsModule,
    OrganizationModule,
    NotificationModule,
    PhotosModule,
    ProfileModule,
    QueryModule,
    TypeOrmModule.forFeature([
      BlogPost,
      BlogPostComment,
      BlogPostPhoto,
      BlogPostReaction,
      Profile,
    ]),
  ],
  controllers: [
    BlogsController,
    BlogCommentsController,
    BlogReactionsController,
  ],
  providers: [
    BlogPostService,
    CreateBlogPostHandler,
    CreateBlogPostCommentHandler,
    CreateBlogPostReactionHandler,
    DeleteBlogPostHandler,
    DeleteBlogPostCommentHandler,
    DeleteBlogPostReactionHandler,
    GetBlogPostHandler,
    GetBlogPostListHandler,
    NotifyOrganizationOnPostedBlogPostHandler,
    NotifyOrganizationOnPostedBlogPostCommentHandler,
    SendBlogPostSummaryCommandHandler,
    SendSummaryJobs,
    UpdateBlogPostHandler,
  ],
})
export class BlogsModule {}
