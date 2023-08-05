import {
  Column,
  Entity,
  Index,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ChatMessage } from "src/features/chat/infrastructure/entities/chat-message.entity";
import { Swipe } from "src/features/matches/infrastructure/entities/swipe.entity";
import { OrganizationMembership } from "src/features/organizations/infrastructure/entities/organization-membership.entity";
import { ProfilePhoto } from "src/features/photos/infrastructure/entities/profile-photo.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("date")
  dateOfBirth!: Date;

  @Column({ length: 1024 })
  description!: string;

  @OneToMany(() => Swipe, (swipe) => swipe.profile)
  likes!: Swipe[];

  @OneToMany(() => Swipe, (swipe) => swipe.shownProfile)
  likedBy!: Swipe[];

  @Column({ length: 128 })
  name!: string;

  @OneToMany(() => OrganizationMembership, (member) => member.profile)
  organizationMemberships!: OrganizationMembership[];

  @OneToMany(() => ProfilePhoto, (photo) => photo.profile)
  photos!: ProfilePhoto[];

  @Column({ type: "point" })
  recentLocation!: Point;

  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.receiver)
  receivedMessages!: ChatMessage;

  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.sender)
  sentMessage!: ChatMessage;

  @Index({ unique: true })
  @Column({ length: 128 })
  userId!: string;
}
