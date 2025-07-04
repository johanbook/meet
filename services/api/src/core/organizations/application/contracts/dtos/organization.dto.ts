import { OrganizationPhotoDetails } from "./organization-photo.dto";

export class OrganizationDetails {
  created!: string;
  id!: number;
  name!: string;
  photo?: OrganizationPhotoDetails;
}
