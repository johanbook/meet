import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";

import { Profile } from "../../infrastructure/entities/profile.entity";

const CURRENT_PROFILE_CACHE_PERIOD_MS = 1000;

@Injectable()
export class CurrentProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async fetchCurrentProfile(): Promise<{ id: number; name: string }> {
    const userId = this.userIdService.getUserId();

    const currentProfile = await this.profiles.findOne({
      cache: CURRENT_PROFILE_CACHE_PERIOD_MS,
      select: {
        id: true,
        name: true,
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
