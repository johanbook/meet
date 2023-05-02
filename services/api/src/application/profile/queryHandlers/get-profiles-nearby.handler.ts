import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";

import { GetProfilesNearbyQuery } from "../contracts/get-profiles-nearby.query";
import { ProfileDetails } from "../contracts/profile.dto";

const DISTANCE = 100;

@QueryHandler(GetProfilesNearbyQuery)
export class GetProfilesNearbyHandler
  implements IQueryHandler<GetProfilesNearbyQuery, ProfileDetails[]>
{
  constructor(
    private readonly objectStorageService: ObjectStorageService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute() {
    const userId = this.userIdService.getUserId();

    const userProfile = await this.profiles.findOne({
      where: { userId },
    });

    if (!userProfile) {
      throw new NotFoundException("Unable to find user profile");
    }

    const recentLocation = userProfile.recentLocation as any;
    console.log({ recentLocation });

    const foundProfiles = await this.profiles
      .createQueryBuilder("profile")
      .select(["profile.id", "profile.description", "profile.name"])
      .setFindOptions({
        relations: {
          photos: true,
        },
      })
      .where(
        // TODO: Clean this up
        "ST_DWithin(CAST(profile.recentLocation as GEOMETRY),CAST(ST_MakePoint(CAST(:x as FLOAT), CAST(:y as FLOAT)) as GEOMETRY),:distance)",
        {
          distance: DISTANCE,
          x: recentLocation.x,
          y: recentLocation.y,
        },
      )
      .andWhere({ userId: Not(userId) })
      .getMany();

    return foundProfiles.map((profile) => ({
      ...profile,
      photos: profile.photos.map((photo) => ({
        ...photo,
        imageUrl: this.objectStorageService.getUrl(
          "profile-photos",
          photo.objectId,
        ),
      })),
    }));
  }
}
