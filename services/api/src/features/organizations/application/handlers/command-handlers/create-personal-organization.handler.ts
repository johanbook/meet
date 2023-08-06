import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { OrganizationService } from "src/features/organizations/domain/services/organization.service";
import { CurrentProfileService } from "src/features/profiles";

import { CreatePersonalOrganizationCommand } from "../../contracts/commands/create-personal-organization.command";

@CommandHandler(CreatePersonalOrganizationCommand)
export class CreatePersonalOrganizationHandler
  implements ICommandHandler<CreatePersonalOrganizationCommand, void>
{
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly organizationService: OrganizationService,
  ) {}

  async execute() {
    const currentProfile =
      await this.currentProfileService.fetchCurrentProfile();

    // TODO: Check if there already exsits a personal organization

    await this.organizationService.createOrganization({
      name: currentProfile.name,
      owner: currentProfile,
      personal: true,
    });
  }
}
