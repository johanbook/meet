import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CommandBus, ICommand } from "@nestjs/cqrs";

import { Logger } from "src/core/logging";
import { map } from "src/core/mapper";

import { CreateJournalEntryCommand } from "./application/contracts/commands/create-journal-entry.command";
import { IGNORE_JOURNAL_KEY } from "./no-journal.decorator";

@Injectable()
export class JournalLogger {
  private logger = new Logger(JournalLogger.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly reflector: Reflector,
  ) {
    this.commandBus.subscribe((command: ICommand) => {
      const commandName = command.constructor.name;
      const payload = command;

      const ignoreCommand = this.reflector.get<boolean | undefined>(
        IGNORE_JOURNAL_KEY,
        command.constructor,
      );

      if (ignoreCommand) {
        return;
      }

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
