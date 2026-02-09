import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityNotFoundError } from "src/core/error-handling";
import { CurrentOrganizationService } from "src/core/organizations/domain/services/current-organization.service";

import { OrganizationMembership } from "../../../infrastructure/entities/organization-membership.entity";
import { RemoveMemberFromCurrentOrganizationCommand } from "../../contracts/commands/remove-member-from-current-organization.command";

@CommandHandler(RemoveMemberFromCurrentOrganizationCommand)
export class RemoveMemberFromCurrentOrganizationHandler implements ICommandHandler<
  RemoveMemberFromCurrentOrganizationCommand,
  void
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    @InjectRepository(OrganizationMembership)
    private readonly memberships: Repository<OrganizationMembership>,
  ) {}

  async execute(command: RemoveMemberFromCurrentOrganizationCommand) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const membership = await this.memberships.findOne({
      where: {
        organizationId: currentOrganizationId,
        id: command.membershipId,
      },
    });

    if (!membership) {
      throw new EntityNotFoundError(OrganizationMembership);
    }

    await this.memberships.remove(membership);
  }
}
