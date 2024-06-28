import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Cron, CronExpression } from "@nestjs/schedule";

import { Logger } from "src/core/logging";

import { SendBlogPostSummaryCommand } from "../../application/contracts/commands/send-blog-post-summary.command";

@Injectable()
export class SendSummaryJobs {
  private readonly logger = new Logger(SendSummaryJobs.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
  async sendSummaries(): Promise<void> {
    this.logger.debug("Sending summary");

    const command = new SendBlogPostSummaryCommand();
    await this.commandBus.execute(command);

    this.logger.debug("Finished sending summary");
  }
}
