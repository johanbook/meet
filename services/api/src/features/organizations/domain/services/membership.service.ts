import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentProfileService } from "src/features/profiles";

import { OrganizationMembership } from "../../infrastructure/entities/organization-membership.entity";

@Injectable()
export class MembershipService {
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(OrganizationMembership)
    private readonly memberships: Repository<OrganizationMembership>,
  ) {}

  async fetchCurrentMembership(
    organizationId: number,
  ): Promise<OrganizationMembership> {
    const profileId = await this.currentProfileService.fetchCurrentProfileId();

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

  async fetchCurrentOrganizationMemberIds(
    currentOrganizationId: number,
  ): Promise<number[]> {
    const membershipIds = await this.memberships.find({
      select: ["profileId"],
      where: {
        organizationId: currentOrganizationId,
      },
    });

    return membershipIds.map((x) => x.profileId);
  }
}
