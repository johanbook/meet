import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";

import { Profile } from "src/core/profiles";

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @Column("boolean")
  darkmode!: boolean;

  @OneToOne(() => Profile)
  profile!: Profile;

  @Column()
  profileId!: number;
}
