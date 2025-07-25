import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Cache } from "src/core/cache";
import { EntityNotFoundError } from "src/core/error-handling";

import { OrganizationMembership } from "../../infrastructure/entities/organization-membership.entity";
import { Organization } from "../../infrastructure/entities/organization.entity";
import { ActiveOrganizationService } from "./active-organization.service";
import { MembershipService } from "./membership.service";

const ORGANIZATION_CACHE_MS = 10_000;

@Injectable()
export class CurrentOrganizationService {
  private cache = new Cache<Organization | null>(ORGANIZATION_CACHE_MS);

  constructor(
    private readonly activeOrganizationService: ActiveOrganizationService,
    private readonly membershipService: MembershipService,
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>,
  ) {}

  async checkIfMembersInCurrentOrganization(
    profileIds: number[],
  ): Promise<boolean> {
    const members = await this.fetchCurrentOrganizationMemberIds();

    return profileIds.every((profileId) => members.includes(profileId));
  }

  async fetchCurrentMembership(): Promise<OrganizationMembership> {
    const organizationId = await this.fetchCurrentOrganizationId();

    return await this.membershipService.fetchCurrentMembership(organizationId);
  }

  async fetchCurrentOrganization(): Promise<Organization> {
    const activeOrganization =
      await this.activeOrganizationService.fetchCurrentActiveOrganization();

    const organizationId = activeOrganization?.organizationId;

    if (!organizationId) {
      throw new EntityNotFoundError(Organization);
    }

    const currentOrganization = await this.cache.getOrUpdate(
      organizationId,
      () =>
        this.organizations.findOne({
          relations: {
            features: true,
            photo: true,
          },
          where: {
            id: organizationId,
          },
        }),
    );

    if (!currentOrganization) {
      throw new EntityNotFoundError(Organization);
    }

    return currentOrganization;
  }

  async fetchCurrentOrganizationId(): Promise<number> {
    const currentOrganization = await this.fetchCurrentOrganization();
    return currentOrganization.id;
  }

  async fetchCurrentOrganizationMemberIds(): Promise<number[]> {
    const currentOrganizationId = await this.fetchCurrentOrganizationId();

    return this.membershipService.fetchCurrentOrganizationMemberIds(
      currentOrganizationId,
    );
  }

  async switchCurrentOrganization(organizationId: number): Promise<void> {
    await this.activeOrganizationService.switchCurrentOrganization(
      organizationId,
    );
  }
}
