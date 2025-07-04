import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { OrganizationMembership } from "./organization-membership.entity";
import { OrganizationPermission } from "./organization-permission.entity";
import { OrganizationPhoto } from "./organization-photo.entity";

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

  @Column("uuid", { nullable: true })
  photoId?: string;

  @OneToOne(() => OrganizationPhoto, (photo) => photo.organizationId, {
    cascade: true,
  })
  @JoinColumn()
  photo?: OrganizationPhoto;

  @Column({ type: "varchar", length: 32, default: "default" })
  theme!: string;
}
