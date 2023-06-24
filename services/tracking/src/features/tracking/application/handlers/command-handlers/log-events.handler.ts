import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { Logger } from "src/core/logging/logger.service";

import { LogEventsCommand } from "../../contracts/commands/log-events.command";

@CommandHandler(LogEventsCommand)
export class LogEventsHandler
  implements ICommandHandler<LogEventsCommand, void>
{
  private logger = new Logger(LogEventsHandler.name);

  async execute(command: LogEventsCommand) {
    for (const event of command.events) {
      this.logger.log(event);
    }
  }
}
