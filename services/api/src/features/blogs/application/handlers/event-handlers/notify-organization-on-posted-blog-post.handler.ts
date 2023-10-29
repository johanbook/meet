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

import { BlogPostCreatedEvent } from "../../../domain/events/blog-post-created.event";

@EventsHandler(BlogPostCreatedEvent)
export class NotifyOrganizationOnPostedBlogPostHandler
  implements IEventHandler<BlogPostCreatedEvent>
{
  constructor(
    private readonly notificationService: NotificationService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async handle(event: BlogPostCreatedEvent) {
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
      description: `${profile.name} made a new blog post in your organization.`,
      message: `${profile.name} made a new post`,
      resourcePath: `/blog/${event.id}`,
      type: NotificationEventsConstants.NEW_BLOG_POST,
    };

    await this.notificationService.notifyOrganization(
      event.organizationId,
      notification,
      [event.profileId],
    );
  }
}
