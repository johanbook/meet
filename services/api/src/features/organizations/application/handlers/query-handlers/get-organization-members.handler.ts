import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";

import { CurrentOrganizationService } from "../../../domain/services/current-organization.service";
import { OrganizationMembership } from "../../../infrastructure/entities/organization-membership.entity";
import { OrganizationMemberDetails } from "../../contracts/dtos/organization-member.dto";
import { GetOrganizationMembersQuery } from "../../contracts/queries/get-organization-members.query";

@QueryHandler(GetOrganizationMembersQuery)
export class GetOrganizationMembersHandler
  implements
    IQueryHandler<GetOrganizationMembersQuery, OrganizationMemberDetails[]>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    @InjectRepository(OrganizationMembership)
    private readonly organizationMemberships: Repository<OrganizationMembership>,
  ) {}

  async execute() {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const members = await this.organizationMemberships.find({
      relations: {
        profile: true,
      },
      where: {
        organizationId: currentOrganizationId,
      },
    });

    return mapArray(OrganizationMemberDetails, members, (member) => ({
      joinedAt: member.created.toISOString(),
      name: member.profile.name,
      profileId: member.profileId,
    }));
  }
}
