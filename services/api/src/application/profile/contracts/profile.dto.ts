export class PhotoDetails {
  imageUrl!: string;
}

export class ProfileDetails {
  id!: number;
  description!: string;
  name!: string;
  photos!: PhotoDetails[];
}
