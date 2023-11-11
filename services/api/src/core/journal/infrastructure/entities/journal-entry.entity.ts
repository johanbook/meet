import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Organization } from "src/core/organizations";
import { Profile } from "src/core/profiles";

@Entity()
export class JournalEntry extends BaseEntity {
  @Column("text")
  commandName!: string;

  @ManyToOne(() => Organization)
  organization!: Organization;

  @Column()
  organizationId!: number;

  @Column("json")
  payload!: unknown;

  @ManyToOne(() => Profile)
  profile!: Profile;

  @Column()
  profileId!: number;
}
