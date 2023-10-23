import { ConflictException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Profile } from "src/features/profiles";

import { CurrentOrganizationService } from "../../../domain/services/current-organization.service";
import { OrganizationService } from "../../../domain/services/organization.service";
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

    const isAlreadyMember = await this.organizationService.checkIfMember(
      command.profileId,
      currentOrganizationId,
    );

    if (isAlreadyMember) {
      throw new ConflictException("Profile already member of organization");
    }

    await this.organizationService.addMember(
      currentOrganizationId,
      command.profileId,
    );
  }
}
