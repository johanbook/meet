import { Column, Entity, Index, ManyToOne } from "typeorm";

import { BasePhoto } from "src/core/photos";
import { Profile } from "src/core/profiles";

import { BlogPost } from "./blog-post.entity";

@Entity()
@Index(["blogPostId", "order"], { unique: true })
export class BlogPostPhoto extends BasePhoto {
  @Column({ type: "varchar", length: 2048, default: "" })
  description!: string;

  @Column({ type: "int" })
  order!: number;

  @ManyToOne(() => BlogPost, (post) => post.photos, { onDelete: "CASCADE" })
  blogPost!: BlogPost;

  @Column()
  blogPostId!: string;

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  profile!: Profile;

  @Column()
  profileId!: number;
}
