import { ForbiddenException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentOrganizationService } from "src/core/organizations/domain/services/current-organization.service";
import { OrganizationService } from "src/core/organizations/domain/services/organization.service";
import { CurrentProfileService } from "src/core/profiles";

import { SwitchOrganizationCommand } from "../../contracts/commands/switch-organization.command";

@CommandHandler(SwitchOrganizationCommand)
export class SwitchOrganizationHandler implements ICommandHandler<
  SwitchOrganizationCommand,
  void
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    private readonly organizationService: OrganizationService,
  ) {}

  async execute(command: SwitchOrganizationCommand) {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const hasAccess = await this.organizationService.checkIfMember(
      currentProfileId,
      command.organizationId,
    );

    if (!hasAccess) {
      throw new ForbiddenException();
    }

    await this.currentOrganizationService.switchCurrentOrganization(
      command.organizationId,
    );
  }
}
