import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { ChatMessageDetails } from "src/application/chats/contracts/chat.dto";
import { GetChatMessagesQuery } from "src/application/chats/contracts/get-chat-messages.query";
import { PostChatMessageCommand } from "src/application/chats/contracts/post-chat-message.command";

@Controller("chats")
@ApiTags("chats")
export class ChatsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getChats(
    @Query() query: GetChatMessagesQuery,
  ): Promise<ChatMessageDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Post()
  async postChatMessage(
    @Body() command: PostChatMessageCommand,
  ): Promise<void> {
    return await this.commandBus.execute(command);
  }
}
