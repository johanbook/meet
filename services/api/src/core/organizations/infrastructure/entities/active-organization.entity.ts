import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/core/profiles";

import { Organization } from "./organization.entity";

@Entity()
export class ActiveOrganization extends BaseEntity {
  @ManyToOne(() => Organization, { onDelete: "SET NULL" })
  organization?: Organization;

  @Column()
  organizationId!: number;

  @OneToOne(() => Profile, { onDelete: "CASCADE" })
  profile!: Profile;

  @Column()
  profileId!: number;
}
