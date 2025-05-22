import { Column, Entity, ManyToOne } from "typeorm";
import { PushSubscription } from "web-push";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/core/profiles";

@Entity()
export class NotificationSubscription extends BaseEntity {
  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  profile!: Profile;

  @Column()
  profileId!: number;

  @Column("json")
  subscription!: PushSubscription;
}
