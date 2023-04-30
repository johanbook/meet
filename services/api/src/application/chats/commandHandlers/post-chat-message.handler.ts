import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ChatMessage } from "src/infrastructure/database/entities/chat-message.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { PostChatMessageCommand } from "../contracts/post-chat-message.command";

@CommandHandler(PostChatMessageCommand)
export class PostChatMessageHandler
  implements ICommandHandler<PostChatMessageCommand, void>
{
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessages: Repository<ChatMessage>,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(command: PostChatMessageCommand) {
    const userId = this.userIdService.getUserId();

    const currentProfile = await this.profiles.findOne({
      where: { userId },
    });

    if (!currentProfile) {
      throw new NotFoundException();
    }

    const chatMessage = new ChatMessage();
    chatMessage.message = command.message;
    chatMessage.receiverId = command.profileId;
    chatMessage.senderId = currentProfile.id;

    await this.chatMessages.save(chatMessage);
  }
}
