import { NotFoundException } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  NotificationEventsConstants,
  NotificationService,
} from "src/core/notifications";
import { INotification } from "src/core/notifications/types";
import { Profile } from "src/core/profiles";

import { ChatMessageSentEvent } from "../../../domain/events/chat-message-sent.event";
import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";

@EventsHandler(ChatMessageSentEvent)
export class NotifyReceiverOnPostedChatMessageHandler
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
      throw new NotFoundException("Profile not found");
    }

    const conversation = await this.chatConversations.findOne({
      select: {
        members: {
          profileId: true,
        },
      },
      where: {
        id: event.conversationId,
      },
    });

    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    const receivers = conversation.members.map((member) => member.profileId);

    const notification: INotification = {
      data: { senderId: event.senderId },
      description: `${profile.name} sent you a message in Meet`,
      message: `${profile.name} sent you a new message`,
      resourcePath: `/chat/${event.senderId}`,
      type: NotificationEventsConstants.NEW_CHAT_MESSAGE,
    };

    await this.notificationService.notifyProfiles(receivers, notification);
  }
}
