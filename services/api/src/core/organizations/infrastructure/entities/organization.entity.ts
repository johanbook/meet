import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { OrganizationMembership } from "./organization-membership.entity";
import { OrganizationPermission } from "./organization-permission.entity";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: string;

  @Column({ type: "varchar", length: 512, default: "" })
  description!: string;

  @OneToMany(
    () => OrganizationMembership,
    (membership) => membership.organization,
    { cascade: true },
  )
  memberships!: OrganizationMembership[];

  @Column({ type: "varchar", length: 128 })
  name!: string;

  @OneToMany(
    () => OrganizationPermission,
    (permission) => permission.organization,
    { cascade: true },
  )
  permissions!: OrganizationPermission[];

  @Column()
  personal!: boolean;

  @Column({ type: "varchar", length: 32, default: "default" })
  theme!: string;
}
