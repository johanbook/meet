import {
  Column,
  Entity,
  Index,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ChatMessage } from "src/features/chat/infrastructure/entities/chat-message.entity";

import { ProfilePhoto } from "./profile-photo.entity";
import { Swipe } from "./swipe.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 1024 })
  description!: string;

  @OneToMany(() => Swipe, (swipe) => swipe.profile)
  likes!: Swipe[];

  @OneToMany(() => Swipe, (swipe) => swipe.shownProfile)
  likedBy!: Swipe[];

  @Column({ length: 128 })
  name!: string;

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
