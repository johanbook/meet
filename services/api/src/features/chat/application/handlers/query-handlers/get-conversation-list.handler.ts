import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { PhotoService } from "src/core/photos";
import { CurrentProfileService } from "src/core/profiles";

import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";
import { ChatConversationDetails } from "../../contracts/dtos/chat-conversation.dto";
import { GetConversationListQuery } from "../../contracts/queries/get-conversation-list.query";

@QueryHandler(GetConversationListQuery)
export class GetConversationListHandler
  implements IQueryHandler<GetConversationListQuery, ChatConversationDetails[]>
{
  constructor(
    @InjectRepository(ChatConversation)
    private readonly conversations: Repository<ChatConversation>,
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    private readonly photoService: PhotoService,
  ) {}

  async execute() {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const matchingConversations = await this.conversations.find({
      relations: {
        messages: true,
        photo: true,
      },
      where: {
        members: {
          profileId: currentProfileId,
        },
        organizationId: currentOrganizationId,
      },
    });

    return mapArray(
      ChatConversationDetails,
      matchingConversations,
      (conversation) => ({
        imageUrl:
          conversation.photo &&
          this.photoService.getUrl(
            conversation.photo,
            "chat-conversation-photo",
          ),
        // TODO: Fix this
        lastMessage: "", //conversation.lastMessage,
        lastMessageSent: new Date(), //conversation.lastMessageSent,
        name: conversation.name,
      }),
    );
  }
}
