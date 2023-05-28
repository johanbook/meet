import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";

@Entity()
export class JournalEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @Column("text")
  commandName!: string;

  @Column("json")
  payload!: unknown;

  @Column()
  profileId!: number;

  @ManyToOne(() => Profile)
  profile!: Profile;
}
