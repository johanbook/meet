import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { PostChatMessageCommand } from "../../application/contracts/commands/post-chat-message.command";
import { ChatMessageDetails } from "../../application/contracts/dtos/chat.dto";
import { ConnectionDetails } from "../../application/contracts/dtos/connection.dto";
import { GetChatMessagesQuery } from "../../application/contracts/queries/get-chat-messages.query";
import { GetConnectionsQuery } from "../../application/contracts/queries/get-connections.query";

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

  @Get("/connections")
  async getConnections(
    @Query() query: GetConnectionsQuery,
  ): Promise<ConnectionDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Post()
  async postChatMessage(
    @Body() command: PostChatMessageCommand,
  ): Promise<void> {
    return await this.commandBus.execute(command);
  }
}
