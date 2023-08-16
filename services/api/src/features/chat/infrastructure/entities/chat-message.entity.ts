import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";

import { Profile } from "src/features/profiles/infrastructure/entities/profile.entity";

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

  @ManyToOne(() => Profile)
  receiver!: Profile;

  @Column()
  senderId!: number;

  @ManyToOne(() => Profile)
  sender!: Profile;
}
