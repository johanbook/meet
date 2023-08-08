import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { NotificationModule } from "src/core/notifications/notification.module";
import { Profile } from "src/features/profiles";

import { PostChatMessageHandler } from "./application/handlers/command-handlers/post-chat-message.handler";
import { NotifyReceiverOnPostedChatMessageHandler } from "./application/handlers/event-handlers/notify-receiver-on-posted-message.handler";
import { GetChatMessagesHandler } from "./application/handlers/query-handlers/get-chat-messages.handler";
import { ChatsController } from "./client/controllers/chats.controller";
import { ChatMessageService } from "./domain/services/chat-message.service";
import { ChatMessage } from "./infrastructure/entities/chat-message.entity";

@Module({
  imports: [
    AuthenticationModule,
    CqrsModule,
    NotificationModule,
    TypeOrmModule.forFeature([ChatMessage, Profile]),
  ],
  controllers: [ChatsController],
  providers: [
    ChatMessageService,
    GetChatMessagesHandler,
    NotifyReceiverOnPostedChatMessageHandler,
    PostChatMessageHandler,
  ],
})
export class ChatModule {}
