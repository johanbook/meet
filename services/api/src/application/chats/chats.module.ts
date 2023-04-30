import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChatMessage } from "src/infrastructure/database/entities/chat-message.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { MapperModule } from "src/utils/mapper/mapper.module";

import { PostChatMessageHandler } from "./commandHandlers/post-chat-message.handler";
import { GetChatMessagesHandler } from "./queryHandlers/get-chat-messages.handler";

@Module({
  imports: [MapperModule, TypeOrmModule.forFeature([ChatMessage, Profile])],
  controllers: [],
  providers: [GetChatMessagesHandler, PostChatMessageHandler],
})
export class ChatsModule {}
