import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ObjectStorageService } from "src/core/object-storage";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { mapArray } from "src/utils/mapper";

import { GetProfilesNearbyQuery } from "../contracts/get-profiles-nearby.query";
import { PhotoDetails } from "../contracts/photo.dto";
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
      .andWhere(
        `
        profile.id NOT IN (
          SELECT "shownProfileId" FROM swipe
          WHERE "profileId" = :currentProfileId
        )
        `,
        { currentProfileId: userProfile.id },
      )
      .getMany();

    return mapArray(ProfileDetails, foundProfiles, (profile) => ({
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
    }));
  }
}
