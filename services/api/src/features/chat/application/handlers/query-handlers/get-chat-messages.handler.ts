import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map, mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { PhotoService } from "src/core/photos";
import { CurrentProfileService } from "src/core/profiles";

import { ChatMessage } from "../../..//infrastructure/entities/chat-message.entity";
import { ChatMessageProfileDetails } from "../../contracts/dtos/chat-message-profile.dto";
import { ChatMessageDetails } from "../../contracts/dtos/chat-message.dto";
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
    private readonly photoService: PhotoService,
  ) {}

  async execute(query: GetChatMessagesQuery) {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const foundChatMessages = await this.chatMessages.find({
      relations: {
        sender: {
          profilePhoto: true,
        },
      },
      order: {
        created: "ASC",
      },
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
      profile: map(ChatMessageProfileDetails, {
        id: item.sender.id,
        name: item.sender.name,
        imageUrl:
          item.sender.profilePhoto &&
          this.photoService.getUrl(item.sender.profilePhoto, "profile-photo"),
      }),
      sentByCurrentUser: item.senderId == currentProfileId,
      read: false,
    }));
  }
}
