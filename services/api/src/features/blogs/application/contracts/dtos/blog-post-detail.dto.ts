import { ProfileDetails } from "./profile.dto";

export class BlogPostDetails {
  id!: string;
  content!: string;
  createdAt!: string;
  profile!: ProfileDetails;
}
