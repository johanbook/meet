import { BlogPostCommentReactionDetails } from "./blog-post-comment-reactions.dto";
import { BlogPostProfileDetails } from "./blog-post-profile.dto";

export class BlogPostCommentDetails {
  id!: string;
  content!: string;
  createdAt!: string;
  profile!: BlogPostProfileDetails;
  reactions!: BlogPostCommentReactionDetails;
}
