import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { AnalyzeChatMessageHandler } from "./application/handlers/eventHandlers/analyze-chat-message.handler";

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [AnalyzeChatMessageHandler],
})
export class WingmanModule {}
