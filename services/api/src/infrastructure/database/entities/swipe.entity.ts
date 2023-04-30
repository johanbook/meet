import {
  CreateDateColumn,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

import { Profile } from "./profile.entity";

@Entity()
@Unique(["profile", "shownProfile"])
export class Swipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @Column("bool")
  liked!: boolean;

  @ManyToOne(() => Profile)
  profile!: Profile;

  @ManyToOne(() => Profile)
  shownProfile!: Profile;
}
