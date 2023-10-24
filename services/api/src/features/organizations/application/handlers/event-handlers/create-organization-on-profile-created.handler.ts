import { CommandBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { Logger } from "src/core/logging";
import { mapAndValidate } from "src/core/mapper";
import { ProfileCreatedEvent } from "src/features/profiles";

import { CreatePersonalOrganizationCommand } from "../../contracts/commands/create-personal-organization.command";
import { SwitchOrganizationCommand } from "../../contracts/commands/switch-organization.command";

@EventsHandler(ProfileCreatedEvent)
export class CreateOrganizationOnProfileCreatedHandler
  implements IEventHandler<ProfileCreatedEvent>
{
  private logger = new Logger(CreateOrganizationOnProfileCreatedHandler.name);

  constructor(private commandBus: CommandBus) {}

  async handle(event: ProfileCreatedEvent) {
    this.logger.debug(
      `Creating personal organization for profile with ID '${event.id}'`,
    );

    const createOrganizationCommand = await mapAndValidate(
      CreatePersonalOrganizationCommand,
      {
        name: event.name,
      },
    );

    const organizationId = await this.commandBus.execute(
      createOrganizationCommand,
    );

    const switchToOrganizationCommand = await mapAndValidate(
      SwitchOrganizationCommand,
      { organizationId },
    );

    await this.commandBus.execute(switchToOrganizationCommand);
  }
}
