import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/features/profiles";

import { Organization } from "../../infrastructure/entities/organization.entity";

const CURRENT_ORGANIZATION_CACHE_PERIOD_MS = 1000;

@Injectable()
export class CurrentOrganizationService {
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async fetchCurrentOrganization(): Promise<Organization> {
    const currentOrganization = await this.fetchPersonalOrganization();

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
}
