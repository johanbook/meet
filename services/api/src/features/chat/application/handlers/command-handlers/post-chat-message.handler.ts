import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentProfileService } from "src/core/profiles";

import { ChatMessageService } from "../../../domain/services/chat-message.service";
import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";
import { ChatMessage } from "../../../infrastructure/entities/chat-message.entity";
import { PostChatMessageCommand } from "../../contracts/commands/post-chat-message.command";

@CommandHandler(PostChatMessageCommand)
export class PostChatMessageHandler
  implements ICommandHandler<PostChatMessageCommand, void>
{
  constructor(
    @InjectRepository(ChatConversation)
    private readonly chatConversations: Repository<ChatConversation>,
    private readonly chatMessageService: ChatMessageService,
    private readonly currentProfileService: CurrentProfileService,
  ) {}

  async execute(command: PostChatMessageCommand) {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const chatConversation = await this.chatConversations.findOne({
      where: {
        id: command.chatConversationId,
        members: {
          profileId: currentProfileId,
        },
      },
    });

    if (!chatConversation) {
      throw new NotFoundException("Conversation not found");
    }

    const chatMessage = new ChatMessage();
    chatMessage.conversation = chatConversation;
    chatMessage.message = command.message;
    chatMessage.senderId = currentProfileId;

    await this.chatMessageService.saveChatMessage(chatMessage);
  }
}
