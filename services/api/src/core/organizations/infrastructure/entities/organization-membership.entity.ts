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

  @ManyToOne(() => Organization, (organization) => organization.memberships, {
    onDelete: "CASCADE",
  })
  organization!: Organization;

  @Column()
  organizationId!: number;

  @ManyToOne(() => Profile, (profile) => profile.organizationMemberships, {
    onDelete: "CASCADE",
  })
  profile!: Profile;

  @Column()
  profileId!: number;

  @Column({
    type: "enum",
    enum: OrganizationRole,
    default: OrganizationRole.Member,
  })
  role!: OrganizationRole;
}
