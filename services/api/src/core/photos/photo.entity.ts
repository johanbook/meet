import { Column, ManyToOne } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/features/profiles";

export abstract class BasePhoto extends BaseEntity {
  @Column({ type: "uuid" })
  objectId!: string;

  @Column()
  profileId!: number;

  @ManyToOne(() => Profile)
  profile!: Profile;
}
