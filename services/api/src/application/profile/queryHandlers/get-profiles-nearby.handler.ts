import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { GetProfilesNearbyQuery } from "../contracts/get-profiles-nearby.query";
import { NotFoundException } from "@nestjs/common";

const DISTANCE = 100;

@QueryHandler(GetProfilesNearbyQuery)
export class GetProfilesNearbyHandler
  implements IQueryHandler<GetProfilesNearbyQuery, any>
{
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async execute(query: GetProfilesNearbyQuery) {
    const userProfile = await this.profiles.findOne({
      where: { userId: query.userId },
    });

    if (!userProfile) {
      throw new NotFoundException("Unable to find user profile");
    }

    const recentLocation = userProfile.recentLocation as any;
    console.log({ recentLocation });

    return await this.profiles
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
      .andWhere({ userId: Not(query.userId) })
      .getMany();
  }
}
