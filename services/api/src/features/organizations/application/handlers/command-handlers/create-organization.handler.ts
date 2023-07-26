import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { OrganizationService } from "src/features/organizations/domain/services/organization.service";
import { OrganizationMembership } from "src/features/organizations/infrastructure/entities/organization-membership.entity";
import { Organization } from "src/features/organizations/infrastructure/entities/organization.entity";
import { CurrentProfileService } from "src/features/profiles";

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
    const organization = new Organization();

    organization.name = command.name;
    organization.personal = command.personal;

    const membership = await this.createMembership(organization);
    organization.memberships = [membership];

    await this.organizationService.createOrganization(organization);
  }

  private async createMembership(
    organization: Organization,
  ): Promise<OrganizationMembership> {
    const currentProfile =
      await this.currentProfileService.fetchCurrentProfile();

    const membership = new OrganizationMembership();

    membership.organization = organization;
    membership.profile = currentProfile;

    return membership;
  }
}
