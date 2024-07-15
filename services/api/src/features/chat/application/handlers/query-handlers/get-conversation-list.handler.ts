import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { PhotoService } from "src/core/photos";
import { CurrentProfileService, Profile } from "src/core/profiles";

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
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly photoService: PhotoService,
  ) {}

  async execute() {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const matchingConversations = await this.conversations.find({
      order: {
        messages: {
          created: "DESC",
        },
      },
      relations: {
        members: true,
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

    const profileIdSet = new Set<number>();

    for (const conversation of matchingConversations) {
      for (const member of conversation.members) {
        profileIdSet.add(member.profileId);
      }
    }

    const profileIds = [...profileIdSet];

    // TODO: Combine these queries into one
    const profileList = await this.profiles.find({
      relations: {
        profilePhoto: true,
      },
      where: {
        id: In(profileIds),
      },
    });

    const profileLookup: Record<string, Profile> = {};

    for (const profile of profileList) {
      profileLookup[profile.id] = profile;
    }

    return mapArray(
      ChatConversationDetails,
      matchingConversations,
      (conversation) => {
        const lastMesage = conversation.messages[0];

        let imageUrl: string | undefined;

        if (conversation.photo) {
          imageUrl = this.photoService.getUrl(
            conversation.photo,
            "chat-conversation-photo",
          );
        }

        if (conversation.members.length === 1) {
          const profile = profileLookup[conversation.members[0].profileId];
          imageUrl =
            profile.profilePhoto &&
            this.photoService.getUrl(profile.profilePhoto, "profile-photo");
        }

        return {
          id: conversation.id,
          imageUrl,
          lastMessage: lastMesage ? lastMesage.message : undefined,
          lastMessageSent: lastMesage ? lastMesage.created : undefined,
          name:
            conversation.name ||
            conversation.members
              .map((x) => profileLookup[x.profileId].name)
              .join(", "),
        };
      },
    );
  }
}
