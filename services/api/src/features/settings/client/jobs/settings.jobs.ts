import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Cron, CronExpression } from "@nestjs/schedule";

import { Logger } from "src/core/logging";
import { map } from "src/core/mapper";

import { CreateSettingsIfMissingCommand } from "../../application/contracts/commands/create-settings-if-missing.command";

@Injectable()
export class SettingsJobs {
  private readonly logger = new Logger(SettingsJobs.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async createSettingsIfMissing(): Promise<void> {
    this.logger.debug("Creating settings if missing");

    const command = map(CreateSettingsIfMissingCommand, {});
    await this.commandBus.execute(command);
  }
}
