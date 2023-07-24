import {
  Column,
  Entity,
  Index,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ChatMessage } from "src/features/chat/infrastructure/entities/chat-message.entity";
import { OrganizationMember } from "src/features/organisations/infrastructure/entities/organization-member.entity";
import { ProfilePhoto } from "src/features/photos/infrastructure/entities/profile-photo.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";

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

  @OneToMany(() => OrganizationMember, (member) => member.profile)
  organizations!: OrganizationMember[];

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
