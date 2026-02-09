import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { PhotoService } from "src/core/photos";

import { Profile } from "../../../infrastructure/entities/profile.entity";
import { ProfilePhotoDetails } from "../../contracts/dtos/profile-photo.dto";
import { ProfileDetails } from "../../contracts/dtos/profile.dto";
import { GetProfileQuery } from "../../contracts/queries/get-profile.query";

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<
  GetProfileQuery,
  ProfileDetails
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly photoService: PhotoService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async execute(query: GetProfileQuery) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

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
        id: query.id,
        organizationMemberships: {
          organizationId: currentOrganizationId,
        },
      },
    });

    if (!profile) {
      throw new NotFoundException("Profile not found in current organization");
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
