import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { EntityNotFoundError } from "src/core/error-handling";
import { CurrentOrganizationService } from "src/core/organizations/domain/services/current-organization.service";
import { OrganizationService } from "src/core/organizations/domain/services/organization.service";
import { Profile } from "src/core/profiles";

import { AddMemberToOrganizationViaEmailCommand } from "../../contracts/commands/add-member-to-organization-via-email.command";

@CommandHandler(AddMemberToOrganizationViaEmailCommand)
export class AddMemberToOrganizationViaEmailHandler implements ICommandHandler<
  AddMemberToOrganizationViaEmailCommand,
  void
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly organizationService: OrganizationService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(command: AddMemberToOrganizationViaEmailCommand) {
    const currentOrganization =
      await this.currentOrganizationService.fetchCurrentOrganization();

    if (currentOrganization.personal) {
      throw new ForbiddenException(
        "Cannot invite member to personal organization",
      );
    }

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
      throw new EntityNotFoundError(Profile);
    }

    const isAlreadyMember = await this.organizationService.checkIfMember(
      invitedProfile.id,
      currentOrganization.id,
    );

    if (isAlreadyMember) {
      throw new ConflictException("Profile already member of organization");
    }

    await this.organizationService.addMember(
      currentOrganization.id,
      invitedProfile.id,
    );
  }
}
