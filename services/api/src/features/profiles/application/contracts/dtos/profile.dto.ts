import { PhotoDetails } from "./photo.dto";

export class ProfileDetails {
  id!: number;
  description!: string;
  name!: string;
  photos!: PhotoDetails[];
}
