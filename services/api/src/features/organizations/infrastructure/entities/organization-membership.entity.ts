import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Profile } from "src/features/profiles/infrastructure/entities/profile.entity";

import { Organization } from "./organization.entity";

@Entity()
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
}
