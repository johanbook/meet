import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Logger } from "src/core/logging";
import { Profile } from "src/core/profiles";

import { OrganizationService } from "../../../domain/services/organization.service";
import { CreatePersonalOrganizationsIfMissingCommand } from "../../contracts/commands/create-personal-organizations-if-missing.command";

@CommandHandler(CreatePersonalOrganizationsIfMissingCommand)
export class CreatePersonalOrganizationsIfMissingHandler implements ICommandHandler<
  CreatePersonalOrganizationsIfMissingCommand,
  void
> {
  private logger = new Logger(CreatePersonalOrganizationsIfMissingCommand.name);

  constructor(
    private readonly organizationService: OrganizationService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async execute() {
    const profiles = await this.profiles.find({
      relations: { organizationMemberships: true },
    });

    for (const profile of profiles) {
      if (profile.organizationMemberships.length > 0) {
        continue;
      }

      await this.createPersonalOrganization(profile);
    }
  }

  private async createPersonalOrganization(profile: Profile) {
    this.logger.debug(
      `Creating personal organization for profile with ID ${profile.id}`,
    );

    await this.organizationService.createOrganization({
      name: profile.name,
      ownerId: profile.id,
      personal: true,
    });
  }
}
