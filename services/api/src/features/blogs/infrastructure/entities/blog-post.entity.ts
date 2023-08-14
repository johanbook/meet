import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Organization } from "src/features/organizations";
import { Profile } from "src/features/profiles";

import { BlogPostPhoto } from "./blog-post-photo.entity";

@Entity()
export class BlogPost extends BaseEntity {
  @Column({ type: "varchar", length: 2048, default: "" })
  content!: string;

  @ManyToOne(() => Organization)
  organization!: Organization;

  @Column()
  organizationId!: number;

  @OneToMany(
    () => BlogPostPhoto,
    (photo) => photo.blogPost,

    { cascade: true },
  )
  photos!: BlogPostPhoto[];

  @ManyToOne(() => Profile)
  profile!: Profile;

  @Column()
  profileId!: number;
}
