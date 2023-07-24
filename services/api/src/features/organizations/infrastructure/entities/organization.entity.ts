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
  created!: Date;

  @Column({ type: "varchar", length: 512 })
  description?: string;

  @OneToMany(
    () => OrganizationMembership,
    (membership) => membership.organization,
  )
  members!: OrganizationMembership[];

  @Column({ type: "varchar", length: 128 })
  name!: string;

  @Column()
  personal!: boolean;
}
