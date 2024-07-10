import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/core/profiles";

import { BlogPost } from "./blog-post.entity";

@Entity()
export class BlogPostComment extends BaseEntity {
  @ManyToOne(() => BlogPost, (blogPost) => blogPost.comments, {
    onDelete: "CASCADE",
  })
  blogPost!: BlogPost;

  @Column()
  blogPostId!: string;

  @Column({ type: "varchar", length: 2048, default: "" })
  content!: string;

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  profile!: Profile;

  @Column()
  profileId!: number;
}
