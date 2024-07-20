import { Column, Entity, ManyToOne, Unique } from "typeorm";

import { BaseEntity } from "src/core/database";

import { Organization } from "./organization.entity";

@Entity()
@Unique(["organizationId", "permission"])
export class OrganizationPermission extends BaseEntity {
  @ManyToOne(() => Organization, (organization) => organization.memberships, {
    onDelete: "CASCADE",
  })
  organization!: Organization;

  @Column()
  organizationId!: number;

  @Column()
  permission!: string;
}
