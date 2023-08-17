import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentProfileService } from "src/features/profiles";

import { Settings } from "../../infrastructure/entities/settings.entity";

const CURRENT_PROFILE_CACHE_PERIOD_MS = 1000;

@Injectable()
export class CurrentSettingsService {
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(Settings)
    private readonly settings: Repository<Settings>,
  ) {}

  async checkIfExists(): Promise<boolean> {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    return this.settings.exist({ where: { profileId: currentProfileId } });
  }

  async fetchCurrentSettings(): Promise<Settings> {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const currentSettings = await this.settings.findOne({
      cache: CURRENT_PROFILE_CACHE_PERIOD_MS,
      where: { profileId: currentProfileId },
    });

    if (!currentSettings) {
      throw new NotFoundException(
        "Settings have not been created for this user yet. Please contact support.",
      );
    }

    return currentSettings;
  }
}
