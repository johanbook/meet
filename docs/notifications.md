# Notifications

The software system comes with a builtin notification system.

## Guide

When a notification is created the following will happen:

1. If user is currently using the app, notify them with a snackbar.
2. Otherwise send them a mail notification.

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

import { CacheKeysConstants, useQuery } from "src/core/query";
import { chatsApi } from "src/apis";
import { NotificationEventsConstants } from "src/core/notifications";
import { useHandleNotification } from "src/core/notifications";

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
