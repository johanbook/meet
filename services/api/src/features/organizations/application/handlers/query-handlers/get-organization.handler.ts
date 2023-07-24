import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { map } from "src/core/mapper";
import { CurrentOrganizationService } from "src/features/organizations/domain/services/current-organization.service";

import { OrganizationDetails } from "../../contracts/dtos/organization.dto";
import { GetOrganizationQuery } from "../../contracts/queries/get-organization.query";

@QueryHandler(GetOrganizationQuery)
export class GetOrganizationHandler
  implements IQueryHandler<GetOrganizationQuery, OrganizationDetails>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
  ) {}

  async execute() {
    const currentOrganization =
      await this.currentOrganizationService.fetchCurrentOrganization();

    return map(OrganizationDetails, { name: currentOrganization.name });
  }
}
