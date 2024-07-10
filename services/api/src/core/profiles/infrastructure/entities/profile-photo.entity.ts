import { Column, Entity, OneToOne } from "typeorm";

import { BasePhoto } from "src/core/photos/photo.entity";

import { Profile } from "./profile.entity";

@Entity()
export class ProfilePhoto extends BasePhoto {
  @OneToOne(() => Profile, (profile) => profile.profilePhoto, {
    onDelete: "CASCADE",
  })
  profile!: Profile;

  @Column()
  profileId!: number;
}
