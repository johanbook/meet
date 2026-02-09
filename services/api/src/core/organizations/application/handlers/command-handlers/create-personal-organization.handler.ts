import { ForbiddenException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { OrganizationService } from "src/core/organizations/domain/services/organization.service";
import { CurrentProfileService } from "src/core/profiles";

import { CreatePersonalOrganizationCommand } from "../../contracts/commands/create-personal-organization.command";

@CommandHandler(CreatePersonalOrganizationCommand)
export class CreatePersonalOrganizationHandler implements ICommandHandler<
  CreatePersonalOrganizationCommand,
  number
> {
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
      throw new ForbiddenException("Personal organization does already exist");
    }

    return await this.organizationService.createOrganization({
      name: currentProfile.name,
      ownerId: currentProfile.id,
      personal: true,
    });
  }
}
