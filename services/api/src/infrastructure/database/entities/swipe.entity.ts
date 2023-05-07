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

  @Column()
  profileId!: number;

  @ManyToOne(() => Profile)
  profile!: Profile;

  @Column()
  shownProfileId!: number;

  @ManyToOne(() => Profile)
  shownProfile!: Profile;
}
