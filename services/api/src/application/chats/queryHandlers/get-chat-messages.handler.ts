import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ChatMessage } from "src/infrastructure/database/entities/chat-message.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { mapArray } from "src/utils/mapper";

import { ChatMessageDetails } from "../contracts/chat.dto";
import { GetChatMessagesQuery } from "../contracts/get-chat-messages.query";

@QueryHandler(GetChatMessagesQuery)
export class GetChatMessagesHandler
  implements IQueryHandler<GetChatMessagesQuery, ChatMessageDetails[]>
{
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessages: Repository<ChatMessage>,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(query: GetChatMessagesQuery) {
    const userId = this.userIdService.getUserId();

    const profile = await this.profiles.findOne({
      select: {
        id: true,
      },
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException();
    }

    const currentProfileId = profile.id;
    const targetProfileId = query.profileId;

    const foundChatMessages = await this.chatMessages.find({
      where: [
        { receiverId: currentProfileId, senderId: targetProfileId },
        { receiverId: targetProfileId, senderId: currentProfileId },
      ],
    });

    return mapArray(ChatMessageDetails, foundChatMessages, (item) => ({
      id: item.id,
      message: item.message,
      read: false,
      sentByCurrentUser: item.senderId == profile.id,
    }));
  }
}
