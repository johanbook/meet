import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { map } from "src/core/mapper";

import { CurrentOrganizationService } from "../../../domain/services/current-organization.service";
import { CurrentOrganizationDetails } from "../../contracts/dtos/current-organization.dto";
import { GetOrganizationQuery } from "../../contracts/queries/get-organization.query";

@QueryHandler(GetOrganizationQuery)
export class GetOrganizationHandler
  implements IQueryHandler<GetOrganizationQuery, CurrentOrganizationDetails>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
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
      role: membership.role,
      theme: currentOrganization.theme,
    });
  }
}
