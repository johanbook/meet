import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChatMessage } from "src/infrastructure/database/entities/chat-message.entity";

import { ChatMessageDomainService } from "./services/chat-message-domain.service";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ChatMessage])],
  exports: [ChatMessageDomainService],
  providers: [ChatMessageDomainService],
})
export class ChatMessageDomainModule {}
