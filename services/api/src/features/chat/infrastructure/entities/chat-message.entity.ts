import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @Column("text")
  message!: string;

  @Column()
  receiverId!: number;

  @ManyToOne(() => Profile, (profile) => profile.receivedMessages)
  receiver!: Profile;

  @Column()
  senderId!: number;

  @ManyToOne(() => Profile, (profile) => profile.sentMessage)
  sender!: Profile;
}
