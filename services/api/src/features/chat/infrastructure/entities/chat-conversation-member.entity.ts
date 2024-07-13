import { Column, Entity, ManyToOne, OneToOne, Unique } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/core/profiles";

import { ChatConversation } from "./chat-conversation.entity";

@Entity()
@Unique(["conversationId", "profileId"])
export class ChatConversationMember extends BaseEntity {
  @ManyToOne(() => ChatConversation, (conversation) => conversation.members, {
    onDelete: "CASCADE",
  })
  conversation!: ChatConversation;

  @Column()
  conversationId!: string;

  @OneToOne(() => Profile, { onDelete: "CASCADE" })
  profile!: Profile;

  @Column()
  profileId!: number;
}
