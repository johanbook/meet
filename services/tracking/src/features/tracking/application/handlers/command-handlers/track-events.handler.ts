import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { Logger } from "src/core/logging/logger.service";

import { TrackEventsCommand } from "../../contracts/commands/track-event.command";

@CommandHandler(TrackEventsCommand)
export class TrackEventsHandler
  implements ICommandHandler<TrackEventsCommand, void>
{
  private logger = new Logger(TrackEventsHandler.name);

  async execute(command: TrackEventsCommand) {
    for (const event of command.events) {
      this.logger.info(event);
    }
  }
}
