import { NotFoundException } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  NotificationEventsConstants,
  NotificationService,
} from "src/core/notifications";
import { INotification } from "src/core/notifications/types";
import { BlogPostCommentCreatedEvent } from "src/features/blogs/domain/events/blog-post-comment-created.event";
import { Profile } from "src/features/profiles";

@EventsHandler(BlogPostCommentCreatedEvent)
export class NotifyOrganizationOnPostedBlogPostCommentHandler
  implements IEventHandler<BlogPostCommentCreatedEvent>
{
  constructor(
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

    const notification: INotification = {
      description: `${profile.name} made a new comment in your organization. Go in and take a look.`,
      message: `${profile.name} commented on a post in your organization`,
      type: NotificationEventsConstants.NEW_BLOG_POST,
    };

    await this.notificationService.notifyOrganization(
      event.organizationId,
      notification,
      [event.profileId],
    );
  }
}
