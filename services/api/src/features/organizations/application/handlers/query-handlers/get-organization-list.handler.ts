import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { CurrentProfileService } from "src/features/profiles";

import { OrganizationMembership } from "../../../infrastructure/entities/organization-membership.entity";
import { OrganizationDetails } from "../../contracts/dtos/organization.dto";
import { GetOrganizationListQuery } from "../../contracts/queries/get-organization-list.query";

@QueryHandler(GetOrganizationListQuery)
export class GetOrganizationListHandler
  implements IQueryHandler<GetOrganizationListQuery, OrganizationDetails[]>
{
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(OrganizationMembership)
    private readonly organizationMemberships: Repository<OrganizationMembership>,
  ) {}

  async execute() {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const memberships = await this.organizationMemberships.find({
      relations: {
        organization: true,
      },
      where: {
        profileId: currentProfileId,
      },
    });

    return mapArray(OrganizationDetails, memberships, (membership) => ({
      id: membership.organizationId,
      name: membership.organization.name,
    }));
  }
}
