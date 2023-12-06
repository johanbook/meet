import { BlogPostCommentDetails } from "./blog-post-comment.dto";
import { BlogPostPhotoDetails } from "./blog-post-photo.dto";
import { BlogPostProfileDetails } from "./blog-post-profile.dto";
import { BlogPostReactionDetails } from "./blog-post-reactions.dto";

export class BlogPostDetails {
  id!: string;
  comments!: BlogPostCommentDetails[];
  content!: string;
  createdAt!: string;
  ownedByCurrentUser!: boolean;
  photos!: BlogPostPhotoDetails[];
  profile!: BlogPostProfileDetails;
  reactions!: BlogPostReactionDetails;
}
