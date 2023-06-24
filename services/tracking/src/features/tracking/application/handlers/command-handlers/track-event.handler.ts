import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { Logger } from "src/core/logging/logger.service";

import { TrackEventCommand } from "../../contracts/commands/track-event.command";

@CommandHandler(TrackEventCommand)
export class TrackEventHandler
  implements ICommandHandler<TrackEventCommand, void>
{
  private logger = new Logger(TrackEventHandler.name);

  async execute(command: TrackEventCommand) {
    for (const event of command.events) {
      this.logger.info(event);
    }
  }
}
