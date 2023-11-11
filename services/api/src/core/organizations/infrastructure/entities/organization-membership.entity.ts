import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

import { OrganizationRole } from "src/core/authorization/organization-roles.enum";
import { Profile } from "src/core/profiles/infrastructure/entities/profile.entity";

import { Organization } from "./organization.entity";

@Entity()
@Unique(["organizationId", "profileId"])
export class OrganizationMembership {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @Column()
  organizationId!: number;

  @ManyToOne(() => Organization, (organization) => organization.memberships)
  organization!: Organization;

  @Column()
  profileId!: number;

  @ManyToOne(() => Profile, (profile) => profile.organizationMemberships)
  profile!: Profile;

  @Column({
    type: "enum",
    enum: OrganizationRole,
    default: OrganizationRole.Member,
  })
  role!: OrganizationRole;
}
