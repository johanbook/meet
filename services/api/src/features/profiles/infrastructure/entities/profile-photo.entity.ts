import { Column, Entity, OneToOne } from "typeorm";

import { BasePhoto } from "src/core/photos/photo.entity";

import { Profile } from "./profile.entity";

@Entity()
export class ProfilePhoto extends BasePhoto {
  @Column()
  profileId!: number;

  @OneToOne(() => Profile, (profile) => profile.profilePhoto)
  profile!: Profile;
}
