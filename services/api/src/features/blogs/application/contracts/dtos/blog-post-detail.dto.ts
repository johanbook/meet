import { BlogPostProfileDetails } from "./blog-post-profile.dto";

export class BlogPostDetails {
  id!: string;
  content!: string;
  createdAt!: string;
  profile!: BlogPostProfileDetails;
}
