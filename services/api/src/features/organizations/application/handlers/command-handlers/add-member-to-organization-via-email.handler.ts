import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { CurrentOrganizationService } from "src/features/organizations/domain/services/current-organization.service";
import { OrganizationService } from "src/features/organizations/domain/services/organization.service";
import { Profile } from "src/features/profiles";

import { AddMemberToOrganizationViaEmailCommand } from "../../contracts/commands/add-member-to-organization-via-email.command";

@CommandHandler(AddMemberToOrganizationViaEmailCommand)
export class AddMemberToOrganizationViaEmailHandler
  implements ICommandHandler<AddMemberToOrganizationViaEmailCommand, void>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly organizationService: OrganizationService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(command: AddMemberToOrganizationViaEmailCommand) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const invitedUserId = await this.userIdService.fetchUserIdByEmail(
      command.email,
    );

    if (!invitedUserId) {
      throw new NotFoundException("Email not found");
    }

    const invitedProfile = await this.profiles.findOne({
      select: {
        id: true,
      },
      where: {
        userId: invitedUserId,
      },
    });

    if (!invitedProfile) {
      throw new NotFoundException("Profile not found");
    }

    await this.organizationService.addMember(
      currentOrganizationId,
      invitedProfile.id,
    );
  }
}
