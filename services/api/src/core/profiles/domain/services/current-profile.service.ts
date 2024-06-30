import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { Cache } from "src/core/cache";

import { Profile } from "../../infrastructure/entities/profile.entity";

// Mapping between user id and profile is not expected to ever change
// and can therefore be cached hard
const CACHE_MS = 60 * 60 * 1000;

@Injectable()
export class CurrentProfileService {
  private cache = new Cache<Profile | null>(CACHE_MS);

  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  private async fetchProfile(
    userId: string,
  ): Promise<{ id: number; name: string } | null> {
    return await this.cache.getOrUpdate(userId, () =>
      this.profiles.findOne({
        select: {
          id: true,
          name: true,
        },
        where: { userId },
      }),
    );
  }

  async fetchCurrentProfile(): Promise<{ id: number; name: string }> {
    const userId = this.userIdService.getUserId();

    const currentProfile = await this.fetchProfile(userId);

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
