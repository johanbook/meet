import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import {
  NotificationEventsConstants,
  NotificationService,
} from "src/core/notifications";

import { BlogPostCreatedEvent } from "../../../domain/events/blog-post-created.event";

@EventsHandler(BlogPostCreatedEvent)
export class NotifyOrganizationOnPostedBlogPostHandler
  implements IEventHandler<BlogPostCreatedEvent>
{
  constructor(private readonly notificationService: NotificationService) {}

  handle(event: BlogPostCreatedEvent) {
    const notification = {
      message: "A user in your organization created a new post",
      type: NotificationEventsConstants.NEW_BLOG_POST,
    };

    this.notificationService.notifyOrganization(event.profileId, notification, [
      event.profileId,
    ]);
  }
}
