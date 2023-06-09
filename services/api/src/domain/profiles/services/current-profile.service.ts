import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

const CURRENT_PROFILE_CACHE_PERIOD_MS = 1000;

@Injectable()
export class CurrentProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async fetchCurrentProfile(): Promise<Profile> {
    const userId = this.userIdService.getUserId();

    const currentProfile = await this.profiles.findOne({
      cache: CURRENT_PROFILE_CACHE_PERIOD_MS,
      select: {
        id: true,
      },
      where: { userId },
    });

    if (!currentProfile) {
      throw new NotFoundException("Current profile not found");
    }

    return currentProfile;
  }

  async fetchCurrentProfileId(): Promise<number> {
    const currentProfile = await this.fetchCurrentProfile();
    return currentProfile.id;
  }
}
