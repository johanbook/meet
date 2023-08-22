import { BlogPostPhotoDetails } from "./blog-post-photo.dto";
import { BlogPostProfileDetails } from "./blog-post-profile.dto";

export class BlogPostDetails {
  id!: string;
  content!: string;
  createdAt!: string;
  ownedByCurrentUser!: boolean;
  photos!: BlogPostPhotoDetails[];
  profile!: BlogPostProfileDetails;
}
