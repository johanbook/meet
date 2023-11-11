import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentOrganizationService } from "src/core/organizations/domain/services/current-organization.service";
import { OrganizationService } from "src/core/organizations/domain/services/organization.service";

import { UpdateOrganizationCommand } from "../../contracts/commands/update-organization.command";

@CommandHandler(UpdateOrganizationCommand)
export class UpdateOrganizationHandler
  implements ICommandHandler<UpdateOrganizationCommand, void>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly organizationService: OrganizationService,
  ) {}

  async execute(command: UpdateOrganizationCommand) {
    const currentOrganization =
      await this.currentOrganizationService.fetchCurrentOrganization();

    currentOrganization.name = command.name;

    this.organizationService.updateOrganization(currentOrganization);
  }
}
