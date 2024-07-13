import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";

import { ChatConversation } from "../../infrastructure/entities/chat-conversation.entity";
import { ChatConversationCreatedEvent } from "../events/chat-conversation-created.event";

@Injectable()
export class ChatConversationService {
  constructor(
    @InjectRepository(ChatConversation)
    private readonly chatConversation: Repository<ChatConversation>,
    private readonly eventBus: EventBus,
  ) {}

  async createConversation(conversation: ChatConversation): Promise<void> {
    const createdConversation = await this.chatConversation.save(conversation);

    const event = map(ChatConversationCreatedEvent, {
      id: createdConversation.id,
    });

    this.eventBus.publish(event);
  }
}
