import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";

import { Settings } from "../../infrastructure/entities/settings.entity";

const CURRENT_PROFILE_CACHE_PERIOD_MS = 1000;

@Injectable()
export class CurrentSettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settings: Repository<Settings>,
    private readonly userIdService: UserIdService,
  ) {}

  async checkIfExists(): Promise<boolean> {
    const userId = this.userIdService.getUserId();

    return this.settings.exist({ where: { userId } });
  }

  async fetchCurrentSettings(): Promise<Settings> {
    const userId = this.userIdService.getUserId();

    const currentSettings = await this.settings.findOne({
      cache: CURRENT_PROFILE_CACHE_PERIOD_MS,
      where: { userId },
    });

    if (!currentSettings) {
      throw new NotFoundException(
        "Settings have not been created for this user yet. Please contact support.",
      );
    }

    return currentSettings;
  }
}
