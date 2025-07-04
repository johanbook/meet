import { Column, Entity, OneToOne } from "typeorm";

import { BasePhoto } from "src/core/photos/photo.entity";

import { Organization } from "./organization.entity";

@Entity()
export class OrganizationPhoto extends BasePhoto {
  @OneToOne(() => Organization, (organization) => organization.photo, {
    onDelete: "CASCADE",
  })
  organization!: Organization;

  @Column()
  organizationId!: number;
}
