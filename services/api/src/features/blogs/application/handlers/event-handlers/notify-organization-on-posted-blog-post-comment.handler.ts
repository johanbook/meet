import { NotFoundException } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  NotificationEventsConstants,
  NotificationService,
} from "src/core/notifications";
import { INotification } from "src/core/notifications/types";
import { Profile } from "src/features/profiles";

import { BlogPostCommentCreatedEvent } from "../../../domain/events/blog-post-comment-created.event";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";

@EventsHandler(BlogPostCommentCreatedEvent)
export class NotifyOrganizationOnPostedBlogPostCommentHandler
  implements IEventHandler<BlogPostCommentCreatedEvent>
{
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
      throw new NotFoundException("Profile not found");
    }

    const blogPost = await this.blogPosts.findOne({
      select: {
        profile: {
          name: true,
        },
      },
      relations: {
        profile: true,
      },
      where: {
        id: event.blogPostId,
      },
    });

    if (!blogPost) {
      throw new NotFoundException("Blog post not found");
    }

    const notification: INotification = {
      description: `${profile.name} commented '${event.content}' on ${blogPost.profile.name}'s post.`,
      message: `${profile.name} commented on ${blogPost.profile.name}'s post`,
      resourcePath: `/blog/${event.blogPostId}`,
      type: NotificationEventsConstants.NEW_BLOG_POST,
    };

    await this.notificationService.notifyOrganization(
      event.organizationId,
      notification,
      [event.profileId],
    );
  }
}
