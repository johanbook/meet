import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { CurrentProfileService, Profile } from "src/features/profiles";

import { OrganizationMembership } from "../../infrastructure/entities/organization-membership.entity";
import { Organization } from "../../infrastructure/entities/organization.entity";
import { ActiveOrganizationService } from "./active-organization.service";

const CURRENT_ORGANIZATION_CACHE_PERIOD_MS = 1000;

@Injectable()
export class CurrentOrganizationService {
  constructor(
    private readonly activeOrganizationService: ActiveOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(OrganizationMembership)
    private readonly memberships: Repository<OrganizationMembership>,
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async fetchCurrentMembership(): Promise<OrganizationMembership> {
    const profileId = await this.currentProfileService.fetchCurrentProfileId();
    const organizationId = await this.fetchCurrentOrganizationId();

    const membership = await this.memberships.findOne({
      where: {
        organizationId,
        profileId,
      },
    });

    if (!membership) {
      throw new NotFoundException(
        "Unable to find membership to current organization. Please contact support",
      );
    }

    return membership;
  }

  async fetchCurrentOrganization(): Promise<Organization> {
    const activeOrganization =
      await this.activeOrganizationService.fetchCurrentActiveOrganization();
    const organizationId = activeOrganization?.organizationId;

    const currentOrganization = organizationId
      ? await this.organizations.findOne({ where: { id: organizationId } })
      : await this.fetchPersonalOrganization();

    if (!currentOrganization) {
      throw new NotFoundException(
        "Unable to find current organization. Please contact support",
      );
    }

    return currentOrganization;
  }

  async fetchCurrentOrganizationId(): Promise<number> {
    const currentOrganization = await this.fetchCurrentOrganization();
    return currentOrganization.id;
  }

  async fetchPersonalOrganization(): Promise<Organization> {
    const userId = this.userIdService.getUserId();

    const profile = await this.profiles.findOne({
      cache: CURRENT_ORGANIZATION_CACHE_PERIOD_MS,
      relations: {
        organizationMemberships: {
          organization: true,
        },
      },
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        "Unable to find profile. Please contact support",
      );
    }

    const organizationMembership = profile.organizationMemberships.find(
      (membership) => membership.organization.personal,
    );

    if (!organizationMembership) {
      throw new NotFoundException(
        "Unable to find personal organization membership. Please contact support",
      );
    }

    return organizationMembership.organization;
  }

  async fetchCurrentOrganizationMemberIds(): Promise<number[]> {
    const currentOrganizationId = await this.fetchCurrentOrganizationId();

    const membershipIds = await this.memberships.find({
      select: ["profileId"],
      where: { organizationId: currentOrganizationId },
    });

    return membershipIds.map((x) => x.profileId);
  }

  async switchCurrentOrganization(organizationId: number): Promise<void> {
    await this.activeOrganizationService.switchCurrentOrganization(
      organizationId,
    );
  }
}
