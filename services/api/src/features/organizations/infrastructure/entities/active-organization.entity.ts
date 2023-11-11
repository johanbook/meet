import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/core/profiles";

import { Organization } from "./organization.entity";

@Entity()
export class ActiveOrganization extends BaseEntity {
  @Column()
  organizationId!: number;

  @ManyToOne(() => Organization)
  organization!: Organization;

  @Column()
  profileId!: number;

  @OneToOne(() => Profile)
  profile!: Profile;
}
