import { Column, Entity, ManyToOne, Unique } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/core/profiles";

import { BlogPostComment } from "./blog-post-comment.entity";

@Entity()
@Unique(["blogPostCommentId", "profileId"])
export class BlogPostCommentReaction extends BaseEntity {
  @ManyToOne(() => BlogPostComment, (comment) => comment.reactions, {
    onDelete: "CASCADE",
  })
  blogPostComment!: BlogPostComment;

  @Column()
  blogPostCommentId!: string;

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  profile!: Profile;

  @Column()
  profileId!: number;

  @Column({ type: "varchar", length: 8 })
  reaction!: string;
}
