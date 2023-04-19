import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";

import { GetProfileQuery } from "../contracts/get-profile.query";

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery, any> {
  constructor(
    private readonly objectStorageService: ObjectStorageService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async execute(query: GetProfileQuery) {
    const profile = await this.profiles.findOne({
      select: {
        id: true,
        name: true,
        description: true,
      },
      relations: {
        photos: true,
      },
      where: { userId: query.userId },
    });

    if (!profile) {
      throw new NotFoundException();
    }

    return {
      ...profile,
      photos: profile.photos.map((photo) => ({
        ...photo,
        imageUrl: this.objectStorageService.getUrl(
          "profile-photos",
          photo.objectId,
        ),
      })),
    };
  }
}
