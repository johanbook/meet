import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map, mapArray } from "src/core/mapper";
import { BUCKET_NAMES } from "src/core/object-storage/buckets.config";
import { PhotoService } from "src/core/photos";
import { CurrentProfileService } from "src/core/profiles";

import { OrganizationMembership } from "../../../infrastructure/entities/organization-membership.entity";
import { OrganizationPhotoDetails } from "../../contracts/dtos/organization-photo.dto";
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
    private readonly photoService: PhotoService,
  ) {}

  async execute() {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const memberships = await this.organizationMemberships.find({
      order: {
        organization: {
          name: "ASC",
        },
      },
      relations: {
        organization: {
          photo: true,
        },
      },
      where: {
        profileId: currentProfileId,
      },
    });

    return mapArray(OrganizationDetails, memberships, (membership) => ({
      created: membership.created.toUTCString(),
      id: membership.organizationId,
      name: membership.organization.name,
      photo:
        membership.organization.photo &&
        map(OrganizationPhotoDetails, {
          id: membership.organization.photo.id,
          url: this.photoService.getUrl(
            membership.organization.photo,
            BUCKET_NAMES.ORGANIZATION_PHOTO,
          ),
        }),
    }));
  }
}
