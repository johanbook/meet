import { CommandBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { Logger } from "src/core/logging";
import { mapAndValidate } from "src/core/mapper";
import { ProfileCreatedEvent } from "src/features/profiles";

import { CreateOrganizationCommand } from "../../contracts/commands/create-organization.command";

@EventsHandler(ProfileCreatedEvent)
export class CreateOrganizationOnProfileCreatedHandler
  implements IEventHandler<ProfileCreatedEvent>
{
  private logger = new Logger(CreateOrganizationOnProfileCreatedHandler.name);

  constructor(private commandBus: CommandBus) {}

  async handle(event: ProfileCreatedEvent) {
    this.logger.debug({
      msg: `Creating personal organization for profile with ID '${event.id}'`,
    });

    const command = await mapAndValidate(CreateOrganizationCommand, {
      name: event.name,
      personal: true,
    });

    this.commandBus.execute(command);
  }
}
