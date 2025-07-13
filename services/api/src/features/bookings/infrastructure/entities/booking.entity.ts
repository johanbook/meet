import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/core/database/base.entity";
import { Organization } from "src/core/organizations/infrastructure/entities/organization.entity";
import { Profile } from "src/core/profiles/infrastructure/entities/profile.entity";

@Entity()
export class Booking extends BaseEntity {
  @Column({ type: "varchar", length: 2048, default: "" })
  description!: string;

  @Column({ type: "timestamp without time zone" })
  endTime!: Date;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @ManyToOne(() => Organization)
  organization!: Organization;

  @Column()
  organizationId!: number;

  @ManyToOne(() => Profile)
  profile!: Profile;

  @Column()
  profileId!: number;

  @Column({ type: "timestamp without time zone" })
  startTime!: Date;
}
