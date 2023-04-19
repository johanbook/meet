import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Profile } from "./profile.entity";

@Entity()
export class ProfilePhoto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid" })
  objectId!: string;

  @ManyToOne(() => Profile, (profile) => profile.photos)
  profile!: Profile;
}
