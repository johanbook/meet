import { CommandBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { Logger } from "src/core/logging";
import { ProfileCreatedEvent } from "src/core/profiles";

import { CreateSettingsCommand } from "../../contracts/commands/create-settings.command";

@EventsHandler(ProfileCreatedEvent)
export class CreateSettingsOnProfileCreatedHandler implements IEventHandler<ProfileCreatedEvent> {
  private logger = new Logger(CreateSettingsOnProfileCreatedHandler.name);

  constructor(private commandBus: CommandBus) {}

  async handle(event: ProfileCreatedEvent) {
    this.logger.debug(`Creating settings for profile with ID '${event.id}'`);

    const command = new CreateSettingsCommand();
    await this.commandBus.execute(command);
  }
}
