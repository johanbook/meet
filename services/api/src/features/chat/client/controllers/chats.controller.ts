import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { map } from "src/utils/mapper";

import { PostChatMessageCommand } from "../../application/contracts/commands/post-chat-message.command";
import { ChatMessageDetails } from "../../application/contracts/dtos/chat.dto";
import { GetChatMessagesQuery } from "../../application/contracts/queries/get-chat-messages.query";

@Controller("chats")
@ApiTags("chats")
export class ChatsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getChats(
    @Query("profileId") profileId: string,
  ): Promise<ChatMessageDetails[]> {
    const parsedProfileId = Number.parseInt(profileId);

    if (!parsedProfileId) {
      throw new BadRequestException("Missing target profile id");
    }

    const query = map(GetChatMessagesQuery, { profileId: parsedProfileId });
    return await this.queryBus.execute(query);
  }

  @Post()
  async postChatMessage(
    @Body() command: PostChatMessageCommand,
  ): Promise<void> {
    return await this.commandBus.execute(command);
  }
}
