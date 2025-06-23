import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthorizationModule } from "src/core/authorization/authorization.module";
import { NotificationModule } from "src/core/notifications/notification.module";
import { OrganizationModule } from "src/core/organizations/organization.module";
import { PhotosModule } from "src/core/photos/photos.module";
import { Profile } from "src/core/profiles";
import { ProfileModule } from "src/core/profiles/profile.module";
import { QueryModule } from "src/core/query/query.module";

import { CreateBlogPostCommentReactionHandler } from "./application/handlers/command-handlers/create-blog-post-comment-reaction.handler";
import { CreateBlogPostCommentHandler } from "./application/handlers/command-handlers/create-blog-post-comment.handler";
import { CreateBlogPostReactionHandler } from "./application/handlers/command-handlers/create-blog-post-reaction.handler";
import { CreateBlogPostHandler } from "./application/handlers/command-handlers/create-blog-post.handler";
import { DeleteBlogPostCommentReactionHandler } from "./application/handlers/command-handlers/delete-blog-post-comment-reaction.handler";
import { DeleteBlogPostCommentHandler } from "./application/handlers/command-handlers/delete-blog-post-comment.handler";
import { DeleteBlogPostReactionHandler } from "./application/handlers/command-handlers/delete-blog-post-reaction.handler";
import { DeleteBlogPostHandler } from "./application/handlers/command-handlers/delete-blog-post.handler";
import { UpdateBlogPostHandler } from "./application/handlers/command-handlers/update-blog-post-handler";
import { NotifyOrganizationOnPostedBlogPostCommentHandler } from "./application/handlers/event-handlers/notify-organization-on-posted-blog-post-comment.handler";
import { NotifyOrganizationOnPostedBlogPostHandler } from "./application/handlers/event-handlers/notify-organization-on-posted-blog-post.handler";
import { GetBlogPhotoListHandler } from "./application/handlers/query-handlers/get-blog-photo-list.handler";
import { GetBlogPostListHandler } from "./application/handlers/query-handlers/get-blog-post-list.handler";
import { GetBlogPostHandler } from "./application/handlers/query-handlers/get-blog-post.handler";
import { BlogCommentReactionsController } from "./client/controllers/blog-comment-reactions.controller";
import { BlogCommentsController } from "./client/controllers/blog-comments.controller";
import { BlogReactionsController } from "./client/controllers/blog-reactions.controller";
import { BlogsController } from "./client/controllers/blogs.controller";
import { CleanupOrphanedBlogPhotosJob } from "./client/jobs/cleanup-orphaned-blog-photos.job";
import { BlogPostService } from "./domain/services/blog-post.service";
import { BlogPostCommentReaction } from "./infrastructure/entities/blog-post-comment-reaction.entity";
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
      BlogPostCommentReaction,
      BlogPostPhoto,
      BlogPostReaction,
      Profile,
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    BlogsController,
    BlogCommentsController,
    BlogCommentReactionsController,
    BlogReactionsController,
  ],
  providers: [
    BlogPostService,
    CreateBlogPostHandler,
    CreateBlogPostCommentHandler,
    CreateBlogPostCommentReactionHandler,
    CreateBlogPostReactionHandler,
    DeleteBlogPostHandler,
    DeleteBlogPostCommentHandler,
    DeleteBlogPostCommentReactionHandler,
    DeleteBlogPostReactionHandler,
    GetBlogPostHandler,
    GetBlogPostListHandler,
    GetBlogPhotoListHandler,
    NotifyOrganizationOnPostedBlogPostHandler,
    NotifyOrganizationOnPostedBlogPostCommentHandler,
    UpdateBlogPostHandler,
    CleanupOrphanedBlogPhotosJob,
  ],
})
export class BlogsModule {}
