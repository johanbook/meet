import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CreateChatCommand } from "../../application/contracts/commands/create-chat.command";
import { PostChatMessageCommand } from "../../application/contracts/commands/post-chat-message.command";
import { ChatConversationDetails } from "../../application/contracts/dtos/chat-conversation.dto";
import { ChatMessageDetails } from "../../application/contracts/dtos/chat.dto";
import { GetChatMessagesQuery } from "../../application/contracts/queries/get-chat-messages.query";
import { GetConversationListQuery } from "../../application/contracts/queries/get-conversation-list.query";

@Controller("chats")
@ApiTags("chats")
export class ChatsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getConversations(
    @Query() query: GetConversationListQuery,
  ): Promise<ChatConversationDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Post()
  async createConversation(@Query() command: CreateChatCommand): Promise<void> {
    return await this.commandBus.execute(command);
  }

  @Get("/messages")
  async getChatMessages(
    @Query() query: GetChatMessagesQuery,
  ): Promise<ChatMessageDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Post("/messages")
  async postChatMessage(
    @Body() command: PostChatMessageCommand,
  ): Promise<void> {
    return await this.commandBus.execute(command);
  }
}
