import { Injectable } from "@nestjs/common";
import { CommandBus, ICommand } from "@nestjs/cqrs";

import { Logger } from "src/infrastructure/logger.service";
import { map } from "src/utils/mapper";

import { CreateJournalEntryCommand } from "./application/contracts/commands/create-journal-entry.command";

@Injectable()
export class JournalLogger {
  private logger = new Logger(JournalLogger.name);

  constructor(private readonly commandBus: CommandBus) {
    this.commandBus.subscribe((command: ICommand) => {
      const commandName = command.constructor.name;
      const payload = command;

      this.logger.trace({ msg: "Writing journal entry", commandName, payload });

      this.commandBus.execute(
        map(CreateJournalEntryCommand, {
          commandName,
          payload,
        }),
      );
    });
  }
}
