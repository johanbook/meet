import { UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentProfileService } from "src/core/profiles";
import { OrganizationService } from "src/features/organizations/domain/services/organization.service";

import { CreatePersonalOrganizationCommand } from "../../contracts/commands/create-personal-organization.command";

@CommandHandler(CreatePersonalOrganizationCommand)
export class CreatePersonalOrganizationHandler
  implements ICommandHandler<CreatePersonalOrganizationCommand, number>
{
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly organizationService: OrganizationService,
  ) {}

  async execute() {
    const currentProfile =
      await this.currentProfileService.fetchCurrentProfile();

    const personalOrganizationExists =
      await this.organizationService.checkIfPersonalOrganizationExists(
        currentProfile.id,
      );

    if (personalOrganizationExists) {
      throw new UnauthorizedException(
        "Personal organization does already exist",
      );
    }

    return await this.organizationService.createOrganization({
      name: currentProfile.name,
      ownerId: currentProfile.id,
      personal: true,
    });
  }
}
