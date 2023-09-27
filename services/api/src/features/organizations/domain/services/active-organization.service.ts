import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Cache } from "src/core/cache/cache";
import { CurrentProfileService } from "src/features/profiles";

import { ActiveOrganization } from "../../infrastructure/entities/active-organization.entity";

const ACTIVE_ORGANIZATION_CACHE_PERIOD_MS = 5000;

@Injectable()
export class ActiveOrganizationService {
  private cache = new Cache<ActiveOrganization | null>(
    ACTIVE_ORGANIZATION_CACHE_PERIOD_MS,
  );

  constructor(
    @InjectRepository(ActiveOrganization)
    private readonly activeOrganizations: Repository<ActiveOrganization>,
    private readonly currentProfileService: CurrentProfileService,
  ) {}

  async fetchCurrentActiveOrganization(): Promise<ActiveOrganization | null> {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    return await this.cache.getOrUpdate(String(currentProfileId), () =>
      this.activeOrganizations.findOne({
        where: {
          profileId: currentProfileId,
        },
      }),
    );
  }

  async switchCurrentOrganization(organizationId: number): Promise<void> {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    await this.cache.delete(String(organizationId));

    let activeOrganization = await this.fetchCurrentActiveOrganization();

    if (!activeOrganization) {
      activeOrganization = new ActiveOrganization();
      activeOrganization.profileId = currentProfileId;
    }

    activeOrganization.organizationId = organizationId;

    this.activeOrganizations.save(activeOrganization);
  }
}
