import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Cache } from "src/core/cache/cache";
import { CurrentProfileService } from "src/core/profiles";

import { ActiveOrganization } from "../../infrastructure/entities/active-organization.entity";

const ACTIVE_ORGANIZATION_CACHE_PERIOD_MS = 10_000;

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

    return await this.cache.getOrUpdate(currentProfileId, () =>
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

    let activeOrganization = await this.fetchCurrentActiveOrganization();

    if (!activeOrganization) {
      activeOrganization = new ActiveOrganization();
      activeOrganization.profileId = currentProfileId;
    }

    activeOrganization.organizationId = organizationId;

    await this.activeOrganizations.save(activeOrganization);

    await this.cache.set(currentProfileId, activeOrganization);
  }
}
