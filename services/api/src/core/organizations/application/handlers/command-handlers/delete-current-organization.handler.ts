import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentOrganizationService } from "src/core/organizations/domain/services/current-organization.service";
import { OrganizationService } from "src/core/organizations/domain/services/organization.service";
import { CurrentProfileService } from "src/core/profiles";

import { DeleteCurrentOrganizationCommand } from "../../contracts/commands/delete-current-organization.command";

@CommandHandler(DeleteCurrentOrganizationCommand)
export class DeleteCurrentOrganizationHandler
  implements ICommandHandler<DeleteCurrentOrganizationCommand, void>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    private readonly organizationService: OrganizationService,
  ) {}

  async execute() {
    const currentOrganization =
      await this.currentOrganizationService.fetchCurrentOrganization();

    if (currentOrganization.personal) {
      throw new ForbiddenException("Cannot delete personal organization");
    }

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const personalOrganization =
      await this.organizationService.getPersonalOrganization(currentProfileId);

    if (!personalOrganization) {
      throw new NotFoundException("Unable to find personal organization");
    }

    await this.currentOrganizationService.switchCurrentOrganization(
      personalOrganization.id,
    );

    await this.organizationService.deleteOrganization(currentOrganization.id);
  }
}
