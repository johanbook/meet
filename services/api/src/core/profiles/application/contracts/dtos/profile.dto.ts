import { ProfilePhotoDetails } from "./profile-photo.dto";

export class ProfileDetails {
  id!: number;
  description!: string;
  name!: string;
  photo?: ProfilePhotoDetails;
}
