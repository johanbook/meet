import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ChatMessage } from "src/infrastructure/database/entities/chat-message.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { GetChatMessagesQuery } from "../contracts/get-chat-messages.query";

@QueryHandler(GetChatMessagesQuery)
export class GetChatMessagesHandler
  implements IQueryHandler<GetChatMessagesQuery, any>
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

    return await this.chatMessages.find({
      where: [
        { receiverId: currentProfileId, senderId: targetProfileId },
        { receiverId: targetProfileId, senderId: currentProfileId },
      ],
    });
  }
}
