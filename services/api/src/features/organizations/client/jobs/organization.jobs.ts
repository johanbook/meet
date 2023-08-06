import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Cron, CronExpression } from "@nestjs/schedule";

import { Logger } from "src/core/logging";
import { map } from "src/core/mapper";

import { CreatePersonalOrganizationsIfMissingCommand } from "../../application/contracts/commands/create-personal-organizations-if-missing.command";

@Injectable()
export class OrganizationJobs {
  private readonly logger = new Logger(OrganizationJobs.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async createPersonalOrganizationIfMissing(): Promise<void> {
    this.logger.debug("Creating personal organizations if missing");

    const command = map(CreatePersonalOrganizationsIfMissingCommand, {});
    await this.commandBus.execute(command);
  }
}
