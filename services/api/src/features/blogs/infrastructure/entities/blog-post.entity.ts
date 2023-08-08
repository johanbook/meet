import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Organization } from "src/features/organizations/infrastructure/entities/organization.entity";
import { Profile } from "src/features/profiles/infrastructure/entities/profile.entity";

@Entity()
export class BlogPost extends BaseEntity {
  @Column({ type: "varchar", length: 2048, default: "" })
  content!: string;

  @ManyToOne(() => Organization)
  organization!: Organization;

  @Column()
  organizationId!: number;

  @ManyToOne(() => Profile)
  profile!: Profile;

  @Column()
  profileId!: number;
}
