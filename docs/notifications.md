# Notifications

The software system comes with a built-in notification system designed to inform
users of important events. It operates across multiple channels to ensure timely
delivery.

## Overview

The notification system prioritizes delivery channels in the following order:

1.  **Web Push:** If the user has enabled web push notifications a push
    notification is sent to their device. This is ideal for reaching users even
    when they don't have the application open.
2.  **In-App Snackbar:** If the user is actively using the application, a
    snackbar notification is displayed directly within the UI for immediate
    feedback.
3.  **Email:** If neither of the above channels is available, an email is sent
    to the user.

## Guide

### Backend

To create notifications, one uses the `NotificationModule`. It is recommended to
create an event handler to dispatch the notification, in the same manner as done
below.

```ts
import { NotFoundException } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  INotification,
  NotificationEventsConstants,
  NotificationService,
} from "src/core/notifications";
import { Profile } from "src/features/profiles";

import { ChatMessageSentEvent } from "../../../domain/events/chat-message-sent.event";

@EventsHandler(ChatMessageSentEvent)
export class NotifyReceiverOnPostedChatMessageHandler
  implements IEventHandler<ChatMessageSentEvent>
{
  constructor(
    private readonly notificationService: NotificationService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async handle(event: ChatMessageSentEvent) {
    const profile = await this.profiles.findOne({
      select: {
        name: true,
      },
      where: {
        id: event.senderId,
      },
    });

    if (!profile) {
      throw new NotFoundException("Profile not found");
    }

    const notification: INotification = {
      data: {
        receiverId: event.receiverId,
        senderId: event.senderId,
      },
      description: `${profile.name} sent you a message`,
      message: `${profile.name} sent you a new message`,
      resourcePath: `/chat/${event.senderId}`,
      type: NotificationEventsConstants.NEW_CHAT_MESSAGE,
    };

    await this.notificationService.notifyProfiles(
      [event.receiverId],
      notification,
    );
  }
}
```

### Frontend

Notifications are shown automatically in the frontend, but sometimes we want to
trigger some side effect or have a custom handler for specific notification
types.

```tsx
import { ReactElement } from "react";
import { useParams } from "react-router";

import { chatsApi } from "src/apis";
import {
  useHandleNotification,
  NotificationEventsConstants,
} from "src/core/notifications";
import { CacheKeysConstants, useQuery } from "src/core/query";

export function ChatPageContainer(): ReactElement {
  const { error, data, isLoading, refetch } = useQuery(
    [CacheKeysConstants.Chat],
    () => chatsApi.getChats(),
  );

  useHandleNotification({
    onCondition: (event) => String(event.data.senderId) === id,
    onNotification: () => refetch(),
    type: NotificationEventsConstants.NEW_CHAT_MESSAGE,
  });

  // ...
}
```
