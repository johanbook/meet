import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotificationsGateway } from "src/client/gateways/notifications.gateway";
import { ChatMessageDomainModule } from "src/domain/chatMessages/chat-message-domain.module";
import { ChatMessage } from "src/infrastructure/database/entities/chat-message.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { PostChatMessageHandler } from "./commandHandlers/post-chat-message.handler";
import { NotifyReceiverOnPostedChatMessageHandler } from "./eventHandlers/notify-receiver-on-posted-message.handler";
import { GetChatMessagesHandler } from "./queryHandlers/get-chat-messages.handler";

@Module({
  imports: [
    ChatMessageDomainModule,
    TypeOrmModule.forFeature([ChatMessage, Profile]),
  ],
  controllers: [],
  providers: [
    GetChatMessagesHandler,
    NotificationsGateway,
    NotifyReceiverOnPostedChatMessageHandler,
    PostChatMessageHandler,
  ],
})
export class ChatsModule {}
