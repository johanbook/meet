import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  Point,
  PrimaryGeneratedColumn,
} from "typeorm";

import { OrganizationMembership } from "src/core/organizations/infrastructure/entities/organization-membership.entity";

import { ProfilePhoto } from "./profile-photo.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("date")
  dateOfBirth!: Date;

  @Column({ length: 1024 })
  description!: string;

  @Column({ length: 128 })
  name!: string;

  @OneToMany(() => OrganizationMembership, (member) => member.profile)
  organizationMemberships!: OrganizationMembership[];

  @Column("uuid", { nullable: true })
  profilePhotoId?: string;

  @OneToOne(() => ProfilePhoto, (photo) => photo.profileId, { cascade: true })
  @JoinColumn()
  profilePhoto?: ProfilePhoto;

  @Column({ type: "point" })
  recentLocation!: Point;

  @Index({ unique: true })
  @Column({ length: 128 })
  userId!: string;
}
