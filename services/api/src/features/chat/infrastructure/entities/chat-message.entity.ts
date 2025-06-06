import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Profile } from "src/core/profiles/infrastructure/entities/profile.entity";

import { ChatConversation } from "./chat-conversation.entity";

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @ManyToOne(() => ChatConversation, (conversation) => conversation.messages, {
    onDelete: "CASCADE",
  })
  conversation!: ChatConversation;

  @Column()
  conversationId!: string;

  @Column("text")
  message!: string;

  @ManyToOne(() => Profile)
  sender!: Profile;

  @Column()
  senderId!: number;
}
