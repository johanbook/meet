import { ForbiddenException, Injectable } from "@nestjs/common";

import { CurrentOrganizationService } from "src/core/organizations";
import { CurrentProfileService } from "src/core/profiles";

import { OrganizationRole } from "../../organization-roles.enum";

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
  ) {}

  async authorizeOwnerOrAdmin<TEntity extends { profileId: number }>(
    entity: TEntity,
  ): Promise<void> {
    const membership =
      await this.currentOrganizationService.fetchCurrentMembership();

    if (membership.role === OrganizationRole.Admin) {
      return;
    }

    const profileId = await this.currentProfileService.fetchCurrentProfileId();

    if (entity.profileId !== profileId) {
      throw new ForbiddenException(
        `You must own this item to take this action`,
      );
    }
  }
}
