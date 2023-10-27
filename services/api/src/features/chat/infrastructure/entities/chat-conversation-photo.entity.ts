import { Entity, OneToOne } from "typeorm";

import { BasePhoto } from "src/core/photos";

import { ChatConversation } from "./chat-conversation.entity";

@Entity()
export class ChatConversationPhoto extends BasePhoto {
  @OneToOne(() => ChatConversation, (conversation) => conversation.photo, {
    onDelete: "CASCADE",
  })
  conversation!: ChatConversation;
}
