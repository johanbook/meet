import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { NotificationModule } from "src/core/notifications/notification.module";
import { OrganizationModule } from "src/core/organizations/organization.module";
import { PhotosModule } from "src/core/photos/photos.module";
import { Profile } from "src/core/profiles";
import { ProfileModule } from "src/core/profiles/profile.module";

import { CreateChatHandler } from "./application/handlers/command-handlers/create-chat-handler";
import { PostChatMessageHandler } from "./application/handlers/command-handlers/post-chat-message.handler";
import { NotifyReceiverOnPostedChatMessageHandler } from "./application/handlers/event-handlers/notify-receiver-on-posted-message.handler";
import { GetChatMessagesHandler } from "./application/handlers/query-handlers/get-chat-messages.handler";
import { GetConversationListHandler } from "./application/handlers/query-handlers/get-conversation-list.handler";
import { ChatsController } from "./client/controllers/chats.controller";
import { ChatConversationService } from "./domain/services/chat-conversation.service";
import { ChatMessageService } from "./domain/services/chat-message.service";
import { ChatConversation } from "./infrastructure/entities/chat-conversation.entity";
import { ChatMessage } from "./infrastructure/entities/chat-message.entity";

@Module({
  imports: [
    AuthenticationModule,
    CqrsModule,
    NotificationModule,
    OrganizationModule,
    PhotosModule,
    ProfileModule,
    TypeOrmModule.forFeature([ChatMessage, ChatConversation, Profile]),
  ],
  controllers: [ChatsController],
  providers: [
    ChatConversationService,
    ChatMessageService,
    CreateChatHandler,
    GetChatMessagesHandler,
    GetConversationListHandler,
    NotifyReceiverOnPostedChatMessageHandler,
    PostChatMessageHandler,
  ],
})
export class ChatModule {}
