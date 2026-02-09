import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityNotFoundError } from "src/core/error-handling";
import {
  NotificationEventEnum,
  NotificationService,
} from "src/core/notifications";
import { INotification } from "src/core/notifications/types";
import { Profile } from "src/core/profiles";

import { BlogPostCommentCreatedEvent } from "../../../domain/events/blog-post-comment-created.event";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";

@EventsHandler(BlogPostCommentCreatedEvent)
export class NotifyOrganizationOnPostedBlogPostCommentHandler implements IEventHandler<BlogPostCommentCreatedEvent> {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly notificationService: NotificationService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async handle(event: BlogPostCommentCreatedEvent) {
    const profile = await this.profiles.findOne({
      select: {
        name: true,
      },
      where: {
        id: event.profileId,
      },
    });

    if (!profile) {
      throw new EntityNotFoundError(Profile);
    }

    const blogPost = await this.blogPosts.findOne({
      select: {
        profile: {
          name: true,
        },
      },
      relations: {
        comments: true,
        profile: true,
        reactions: true,
      },
      where: {
        id: event.blogPostId,
      },
    });

    if (!blogPost) {
      throw new EntityNotFoundError(BlogPost);
    }

    const notification: INotification = {
      description: event.content,
      message: `${profile.name} commented on ${blogPost.profile.name}'s post`,
      resourcePath: `/blog/${event.blogPostId}`,
      type: NotificationEventEnum.NewBlogPostComment,
    };

    // Notify everyone involved in post except profile that made the new comment
    const profileIds = [
      blogPost.profileId,
      ...blogPost.comments.map((comment) => comment.profileId),
      ...blogPost.reactions.map((reaction) => reaction.profileId),
    ].filter((id) => id !== event.profileId);

    await this.notificationService.notifyProfiles(profileIds, notification);
  }
}
