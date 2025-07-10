import { Column, Entity, ManyToOne, Unique } from "typeorm";

import { BaseEntity } from "src/core/database";

import { OrganizationFeatureEnum } from "../../feature.enum";
import { Organization } from "./organization.entity";

@Entity()
@Unique(["organizationId", "feature"])
export class OrganizationFeature extends BaseEntity {
  @Column({ enum: OrganizationFeatureEnum })
  feature!: OrganizationFeatureEnum;

  @ManyToOne(() => Organization, (organization) => organization.features, {
    onDelete: "CASCADE",
  })
  organization!: Organization;

  @Column()
  organizationId!: number;
}
