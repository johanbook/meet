import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { map } from "src/core/mapper";
import { BUCKET_NAMES } from "src/core/object-storage/buckets.config";
import { PhotoService } from "src/core/photos";

import { CurrentOrganizationService } from "../../../domain/services/current-organization.service";
import { CurrentOrganizationDetails } from "../../contracts/dtos/current-organization.dto";
import { OrganizationPhotoDetails } from "../../contracts/dtos/organization-photo.dto";
import { GetOrganizationQuery } from "../../contracts/queries/get-organization.query";

@QueryHandler(GetOrganizationQuery)
export class GetOrganizationHandler
  implements IQueryHandler<GetOrganizationQuery, CurrentOrganizationDetails>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly photoService: PhotoService,
  ) {}

  async execute() {
    const currentOrganization =
      await this.currentOrganizationService.fetchCurrentOrganization();

    const membership =
      await this.currentOrganizationService.fetchCurrentMembership();

    return map(CurrentOrganizationDetails, {
      created: currentOrganization.created,
      id: currentOrganization.id,
      name: currentOrganization.name,
      permissions: currentOrganization.permissions.map((x) => x.permission),
      photo:
        currentOrganization.photo &&
        map(OrganizationPhotoDetails, {
          id: currentOrganization.photo.id,
          url: this.photoService.getUrl(
            currentOrganization.photo,
            BUCKET_NAMES.ORGANIZATION_PHOTO,
          ),
        }),
      role: membership.role,
      theme: currentOrganization.theme,
    });
  }
}
