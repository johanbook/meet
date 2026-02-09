import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { PhotoService } from "src/core/photos";

import { CurrentOrganizationService } from "../../../domain/services/current-organization.service";
import { OrganizationMembership } from "../../../infrastructure/entities/organization-membership.entity";
import { OrganizationMemberDetails } from "../../contracts/dtos/organization-member.dto";
import { GetOrganizationMembersQuery } from "../../contracts/queries/get-organization-members.query";

@QueryHandler(GetOrganizationMembersQuery)
export class GetOrganizationMembersHandler implements IQueryHandler<
  GetOrganizationMembersQuery,
  OrganizationMemberDetails[]
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    @InjectRepository(OrganizationMembership)
    private readonly organizationMemberships: Repository<OrganizationMembership>,
    private readonly photoSevice: PhotoService,
  ) {}

  async execute() {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const members = await this.organizationMemberships.find({
      order: {
        profile: {
          name: "asc",
        },
      },
      relations: {
        profile: {
          profilePhoto: true,
        },
      },
      where: {
        organizationId: currentOrganizationId,
      },
    });

    return mapArray(OrganizationMemberDetails, members, (member) => ({
      joinedAt: member.created.toISOString(),
      id: member.id,
      imageUrl:
        member.profile.profilePhoto &&
        this.photoSevice.getUrl(member.profile.profilePhoto, "profile-photo"),
      name: member.profile.name,
      profileId: member.profileId,
      role: member.role,
    }));
  }
}
