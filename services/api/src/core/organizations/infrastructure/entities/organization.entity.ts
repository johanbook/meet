import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { OrganizationMembership } from "./organization-membership.entity";

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

  @Column()
  personal!: boolean;
}
