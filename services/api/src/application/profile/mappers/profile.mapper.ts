import { ClassConstructor } from "class-transformer";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { map } from "src/utils/mapper";
import { Mapper } from "src/utils/mapper/mapper.decorator";
import { IMapper } from "src/utils/mapper/mapper.interface";
import { MapperService } from "src/utils/mapper/mapper.service";

import { PhotoDetails } from "../contracts/photo.dto";
import { ProfileDetails } from "../contracts/profile.dto";

@Mapper(Profile, ProfileDetails)
export class ProfileDetailsMapper implements IMapper<Profile, ProfileDetails> {
  constructor(private readonly mappingService: MapperService) {}

  map(source: Profile, target: ClassConstructor<ProfileDetails>) {
    const photos = this.mappingService.mapArray(source.photos, PhotoDetails);

    return map(target, {
      description: source.description,
      id: source.id,
      name: source.name,
      photos,
    });
  }
}
