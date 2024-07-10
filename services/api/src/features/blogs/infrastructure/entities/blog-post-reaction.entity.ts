import { Column, Entity, ManyToOne, Unique } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/core/profiles";

import { BlogPost } from "./blog-post.entity";

@Entity()
@Unique(["blogPostId", "profileId"])
export class BlogPostReaction extends BaseEntity {
  @ManyToOne(() => BlogPost, (blogPost) => blogPost.comments, {
    onDelete: "CASCADE",
  })
  blogPost!: BlogPost;

  @Column()
  blogPostId!: string;

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  profile!: Profile;

  @Column()
  profileId!: number;

  @Column({ type: "varchar", length: 8 })
  reaction!: string;
}
