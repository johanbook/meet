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

import { ChatMessageSentEvent } from "../../../domain/events/chat-message-sent.event";
import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";

@EventsHandler(ChatMessageSentEvent)
export class NotifyChatOnPostedMessageHandler
  implements IEventHandler<ChatMessageSentEvent>
{
  constructor(
    @InjectRepository(ChatConversation)
    private readonly chatConversations: Repository<ChatConversation>,
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
      throw new EntityNotFoundError(Profile);
    }

    const conversation = await this.chatConversations.findOne({
      select: {
        members: {
          profileId: true,
        },
      },
      relations: {
        members: true,
      },
      where: {
        id: event.conversationId,
      },
    });

    if (!conversation) {
      throw new EntityNotFoundError(ChatConversation);
    }

    const receivers = conversation.members
      .map((member) => member.profileId)
      .filter((profileId) => profileId !== event.senderId);

    const notification: INotification = {
      data: { senderId: event.senderId },
      description: `${profile.name} sent you a message in Meet`,
      message: `${profile.name} sent you a new message`,
      resourcePath: `/chat/${event.senderId}`,
      type: NotificationEventEnum.NewChatMessage,
    };

    await this.notificationService.notifyProfiles(receivers, notification);
  }
}
