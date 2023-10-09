import { BlogPostProfileDetails } from "./blog-post-profile.dto";

export class BlogPostCommentDetails {
  id!: string;
  content!: string;
  createdAt!: string;
  profile!: BlogPostProfileDetails;
}
