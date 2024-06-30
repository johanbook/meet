import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { CurrentProfileService } from "src/core/profiles";

import { ChatMessage } from "../../..//infrastructure/entities/chat-message.entity";
import { ChatMessageDetails } from "../../contracts/dtos/chat.dto";
import { GetChatMessagesQuery } from "../../contracts/queries/get-chat-messages.query";

@QueryHandler(GetChatMessagesQuery)
export class GetChatMessagesHandler
  implements IQueryHandler<GetChatMessagesQuery, ChatMessageDetails[]>
{
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessages: Repository<ChatMessage>,
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
  ) {}

  async execute(query: GetChatMessagesQuery) {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const foundChatMessages = await this.chatMessages.find({
      where: {
        conversation: {
          id: query.conversationId,
          organizationId: currentOrganizationId,
        },
      },
    });

    return mapArray(ChatMessageDetails, foundChatMessages, (item) => ({
      id: item.id,
      message: item.message,
      read: false,
      sentByCurrentUser: item.senderId == currentProfileId,
    }));
  }
}
