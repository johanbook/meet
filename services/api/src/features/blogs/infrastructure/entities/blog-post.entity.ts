import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Organization } from "src/core/organizations";
import { Profile } from "src/core/profiles";

import { BlogPostComment } from "./blog-post-comment.entity";
import { BlogPostPhoto } from "./blog-post-photo.entity";

@Entity()
export class BlogPost extends BaseEntity {
  @Column({ type: "varchar", length: 2048, default: "" })
  content!: string;

  @OneToMany(() => BlogPostComment, (comment) => comment.blogPost, {
    cascade: true,
  })
  comments!: BlogPostComment[];

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
