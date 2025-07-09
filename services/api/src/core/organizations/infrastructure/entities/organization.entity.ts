import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ThemeEnum } from "../../theme.enum";
import { OrganizationFeature } from "./organization-feature.entity";
import { OrganizationMembership } from "./organization-membership.entity";
import { OrganizationPhoto } from "./organization-photo.entity";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: string;

  @Column({ type: "varchar", length: 512, default: "" })
  description!: string;

  @OneToMany(() => OrganizationFeature, (feature) => feature.organization, {
    cascade: true,
  })
  features!: OrganizationFeature[];

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

  @Column("uuid", { nullable: true })
  photoId?: string;

  @OneToOne(() => OrganizationPhoto, (photo) => photo.organizationId, {
    cascade: true,
  })
  @JoinColumn()
  photo?: OrganizationPhoto;

  @Column({
    type: "varchar",
    length: 32,
    default: ThemeEnum.Default,
    enum: ThemeEnum,
  })
  theme!: ThemeEnum;
}
