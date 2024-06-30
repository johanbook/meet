import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/core/profiles";

import { ChatConversation } from "./chat-conversation.entity";

@Entity()
export class ChatConversationMember extends BaseEntity {
  @ManyToOne(() => ChatConversation, (conversation) => conversation.members)
  conversation!: ChatConversation;

  @OneToOne(() => Profile)
  profile!: Profile;

  @Column()
  profileId!: number;
}
