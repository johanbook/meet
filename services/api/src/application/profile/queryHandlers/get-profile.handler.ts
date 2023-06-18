import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ObjectStorageService } from "src/core/object-storage";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { map, mapArray } from "src/utils/mapper";

import { GetProfileQuery } from "../contracts/get-profile.query";
import { PhotoDetails } from "../contracts/photo.dto";
import { ProfileDetails } from "../contracts/profile.dto";

@QueryHandler(GetProfileQuery)
export class GetProfileHandler
  implements IQueryHandler<GetProfileQuery, ProfileDetails>
{
  constructor(
    private readonly objectStorageService: ObjectStorageService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute() {
    const userId = this.userIdService.getUserId();

    const profile = await this.profiles.findOne({
      select: {
        id: true,
        name: true,
        description: true,
      },
      relations: {
        photos: true,
      },
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException();
    }

    return map(ProfileDetails, {
      id: profile.id,
      description: profile.description,
      name: profile.name,
      photos: mapArray(PhotoDetails, profile.photos, (photo) => {
        const imageUrl = this.objectStorageService.getUrl(
          "profile-photos",
          photo.objectId,
        );

        return { id: photo.id, imageUrl };
      }),
    });
  }
}
