import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { Profile } from "src/features/profiles";

import { OrganizationMembership } from "../../infrastructure/entities/organization-membership.entity";
import { Organization } from "../../infrastructure/entities/organization.entity";

const CURRENT_ORGANIZATION_CACHE_PERIOD_MS = 1000;

// TODO: This should be stored in a better place, e.g. a cookie or Reddis
const CURRENT_ORGANIZATIONS: Record<string, number> = {};

@Injectable()
export class CurrentOrganizationService {
  constructor(
    @InjectRepository(OrganizationMembership)
    private readonly memberships: Repository<OrganizationMembership>,
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async fetchCurrentOrganization(): Promise<Organization> {
    const userId = this.userIdService.getUserId();

    const organizationId = CURRENT_ORGANIZATIONS[userId];

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

  switchCurrentOrganization(organizationId: number): void {
    const userId = this.userIdService.getUserId();

    CURRENT_ORGANIZATIONS[userId] = organizationId;
  }
}
