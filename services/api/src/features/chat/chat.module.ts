import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotificationsGateway } from "src/client/gateways/notifications.gateway";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { PostChatMessageHandler } from "./application/handlers/command-handlers/post-chat-message.handler";
import { NotifyReceiverOnPostedChatMessageHandler } from "./application/handlers/event-handlers/notify-receiver-on-posted-message.handler";
import { GetChatMessagesHandler } from "./application/handlers/query-handlers/get-chat-messages.handler";
import { ChatMessageService } from "./domain/services/chat-message.service";
import { ChatMessage } from "./infrastructure/entities/chat-message.entity";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ChatMessage, Profile])],
  controllers: [],
  providers: [
    ChatMessageService,
    GetChatMessagesHandler,
    NotificationsGateway,
    NotifyReceiverOnPostedChatMessageHandler,
    PostChatMessageHandler,
  ],
})
export class ChatModule {}
