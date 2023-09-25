import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { Cache } from "src/core/cache";

import { Profile } from "../../infrastructure/entities/profile.entity";

@Injectable()
export class CurrentProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  @Cache({ ttlMs: 5000 })
  private async fetchProfile(
    userId: string,
  ): Promise<{ id: number; name: string } | null> {
    return await this.profiles.findOne({
      select: {
        id: true,
        name: true,
      },
      where: { userId },
    });
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
