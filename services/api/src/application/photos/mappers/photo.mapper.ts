import { ClassConstructor } from "class-transformer";

import { PhotoDetails } from "src/application/profile/contracts/photo.dto";
import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";
import { map } from "src/utils/mapper";
import { Mapper } from "src/utils/mapper/mapper.decorator";
import { IMapper } from "src/utils/mapper/mapper.interface";

@Mapper(ProfilePhoto, PhotoDetails)
export class PhotoDetailsMapper implements IMapper<ProfilePhoto, PhotoDetails> {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  map(source: ProfilePhoto, target: ClassConstructor<PhotoDetails>) {
    return map(target, {
      id: source.id,
      imageUrl: this.objectStorageService.getUrl(
        "profile-photos",
        source.objectId,
      ),
    });
  }
}
