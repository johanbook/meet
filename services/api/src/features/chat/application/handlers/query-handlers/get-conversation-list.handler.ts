import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { map, mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { PhotoService } from "src/core/photos";
import { CurrentProfileService, Profile } from "src/core/profiles";
import { sortByField } from "src/utils/sorting.helper";

import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";
import { ChatConversationDetails } from "../../contracts/dtos/chat-conversation.dto";
import { ChatMessageProfileDetails } from "../../contracts/dtos/chat-message-profile.dto";
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

    const _matchingConversations = await this.conversations.find({
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
        organizationId: currentOrganizationId,
      },
    });

    // TODO: Clean this up
    // Using `member.profileId: currentProfileId` in `where` clause will only include
    // the member matching that condition
    const matchingConversations = _matchingConversations.filter(
      (conversation) => {
        const profileIds = conversation.members.map(
          (member) => member.profileId,
        );

        return profileIds.includes(currentProfileId);
      },
    );

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

    const getProfilePhoto = (id: number) => {
      const photo = profileLookup[id].profilePhoto;
      if (photo) {
        return this.photoService.getUrl(photo, "profile-photo");
      }
    };

    const result = mapArray(
      ChatConversationDetails,
      matchingConversations,
      (conversation) => {
        const lastMesage = conversation.messages[0];

        return {
          createdAt: conversation.createdAt,
          id: conversation.id,
          imageUrl:
            conversation.photo &&
            this.photoService.getUrl(
              conversation.photo,
              "chat-conversation-photo",
            ),
          lastMessage: lastMesage ? lastMesage.message : undefined,
          lastMessageSent: lastMesage ? lastMesage.created : undefined,
          name: conversation.name,
          profiles: sortByField(
            conversation.members
              .filter((member) => member.profileId != currentProfileId)
              .map((member) =>
                map(ChatMessageProfileDetails, {
                  id: member.profileId,
                  imageUrl: getProfilePhoto(member.profileId),
                  name: profileLookup[member.profileId].name,
                }),
              ),
            (member) => member.name,
          ),
        };
      },
    );

    return sortByField(
      result,
      (conversation) =>
        new Date(conversation.lastMessageSent || conversation.createdAt),
      "desc",
    );
  }
}
