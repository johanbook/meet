import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { OrganizationService } from "src/core/organizations/domain/services/organization.service";
import { CurrentProfileService } from "src/core/profiles";

import { CreateOrganizationCommand } from "../../contracts/commands/create-organization.command";

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationHandler
  implements ICommandHandler<CreateOrganizationCommand, void>
{
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly organizationService: OrganizationService,
  ) {}

  async execute(command: CreateOrganizationCommand) {
    const currentProfile =
      await this.currentProfileService.fetchCurrentProfile();

    await this.organizationService.createOrganization({
      name: command.name,
      ownerId: currentProfile.id,
      personal: false,
    });
  }
}
