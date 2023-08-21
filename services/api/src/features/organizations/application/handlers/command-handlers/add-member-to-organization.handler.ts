import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentOrganizationService } from "src/features/organizations/domain/services/current-organization.service";
import { OrganizationService } from "src/features/organizations/domain/services/organization.service";
import { Profile } from "src/features/profiles";

import { AddMemberToOrganizationCommand } from "../../contracts/commands/add-member-to-organization.command";

@CommandHandler(AddMemberToOrganizationCommand)
export class AddMemberToOrganizationHandler
  implements ICommandHandler<AddMemberToOrganizationCommand, void>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly organizationService: OrganizationService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async execute(command: AddMemberToOrganizationCommand) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const profileExists = await this.profiles.exist({
      where: { id: command.profileId },
    });

    if (!profileExists) {
      throw new NotFoundException("Profile not found");
    }

    await this.organizationService.addMember(
      currentOrganizationId,
      command.profileId,
    );
  }
}
