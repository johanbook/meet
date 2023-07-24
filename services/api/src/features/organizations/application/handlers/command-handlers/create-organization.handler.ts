import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { OrganizationService } from "src/features/organizations/domain/services/organization.service";
import { Organization } from "src/features/organizations/infrastructure/entities/organization.entity";

import { CreateOrganizationCommand } from "../../contracts/commands/create-organization.command";

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationHandler
  implements ICommandHandler<CreateOrganizationCommand, void>
{
  constructor(private readonly organizationService: OrganizationService) {}

  async execute(command: CreateOrganizationCommand) {
    const organization = new Organization();
    organization.name = command.name;

    await this.organizationService.createOrganization(organization);
  }
}
