import { Column, Entity, ManyToOne } from "typeorm";

import { BasePhoto } from "src/core/photos";
import { Profile } from "src/features/profiles";

import { BlogPost } from "./blog-post.entity";

@Entity()
export class BlogPostPhoto extends BasePhoto {
  @Column({ type: "varchar", length: 2048, default: "" })
  description!: string;

  @ManyToOne(() => BlogPost, (post) => post.photos, { onDelete: "CASCADE" })
  blogPost!: BlogPost;

  @Column()
  profileId!: number;

  @ManyToOne(() => Profile)
  profile!: Profile;
}
