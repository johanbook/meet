import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { EntityNotFoundError } from "src/core/error-handling";
import { map } from "src/core/mapper";
import { PhotoService } from "src/core/photos";

import { Profile } from "../../../infrastructure/entities/profile.entity";
import { ProfilePhotoDetails } from "../../contracts/dtos/profile-photo.dto";
import { ProfileDetails } from "../../contracts/dtos/profile.dto";
import { GetCurrentProfileQuery } from "../../contracts/queries/get-current-profile.query";

@QueryHandler(GetCurrentProfileQuery)
export class GetCurrentProfileHandler implements IQueryHandler<
  GetCurrentProfileQuery,
  ProfileDetails
> {
  constructor(
    private readonly photoService: PhotoService,
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
        profilePhoto: true,
      },
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new EntityNotFoundError(Profile);
    }

    return map(ProfileDetails, {
      id: profile.id,
      description: profile.description,
      name: profile.name,
      photo:
        profile.profilePhoto &&
        map(ProfilePhotoDetails, {
          id: profile.profilePhoto.id,
          url: this.photoService.getUrl(profile.profilePhoto, "profile-photo"),
        }),
    });
  }
}
