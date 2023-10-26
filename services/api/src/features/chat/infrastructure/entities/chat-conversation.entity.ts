import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Organization } from "src/features/organizations";

import { ChatConversationMember } from "./chat-conversation-member.entity";
import { ChatMessage } from "./chat-message.entity";

@Entity()
export class ChatConversation extends BaseEntity {
  @Column({ type: "varchar", length: 2048, default: "" })
  content!: string;

  @OneToMany(() => ChatConversationMember, (member) => member.conversation, {
    cascade: true,
  })
  members!: ChatConversationMember[];

  @OneToMany(() => ChatMessage, (message) => message.conversation, {
    cascade: true,
  })
  messages!: ChatMessage[];

  @ManyToOne(() => Organization)
  organization!: Organization;

  @Column()
  organizationId!: number;
}
