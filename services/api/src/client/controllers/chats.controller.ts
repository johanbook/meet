import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { GetChatMessagesQuery } from "src/application/chats/contracts/get-chat-messages.query";

@Controller("chats")
@ApiTags("chats")
export class ChatsController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async swipe(@Query() query: GetChatMessagesQuery): Promise<null> {
    return await this.queryBus.execute(query);
  }
}
