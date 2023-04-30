import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { MapperService } from "src/utils/mapper/mapper.service";

import { GetProfileQuery } from "../contracts/get-profile.query";
import { ProfileDetails } from "../contracts/profile.dto";

@QueryHandler(GetProfileQuery)
export class GetProfileHandler
  implements IQueryHandler<GetProfileQuery, ProfileDetails>
{
  constructor(
    private readonly mapperService: MapperService,
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

    // const photos = Mapper.mapArray(PhotoDetails, profile.photos, (photo) => ({
    //   id: photo.id,
    //   imageUrl: this.objectStorageService.getUrl(
    //     "profile-photos",
    //     photo.objectId,
    //   ),
    // }));

    return this.mapperService.map(profile, ProfileDetails);
  }
}
