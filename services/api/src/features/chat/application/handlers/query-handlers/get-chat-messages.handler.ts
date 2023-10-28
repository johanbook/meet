import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { QueryService } from "src/core/query";
import { CurrentProfileService } from "src/features/profiles";

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
    private readonly currentProfileService: CurrentProfileService,
    private readonly queryService: QueryService<ChatMessage>,
  ) {}

  async execute(query: GetChatMessagesQuery) {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const foundChatMessages = await this.queryService.find(this.chatMessages, {
      required: {
        where: {
          conversationId: query.conversationId,
        },
      },
      query,
    });

    return mapArray(ChatMessageDetails, foundChatMessages, (item) => ({
      id: item.id,
      message: item.message,
      read: false,
      sentByCurrentUser: item.senderId == currentProfileId,
    }));
  }
}
