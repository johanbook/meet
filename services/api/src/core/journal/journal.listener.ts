import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CommandBus, ICommand } from "@nestjs/cqrs";

import { Logger } from "src/core/logging";
import { map } from "src/core/mapper";
import { redactBinaries } from "src/utils/object.helper";

import { CreateJournalEntryCommand } from "./application/contracts/commands/create-journal-entry.command";
import { IGNORE_JOURNAL_KEY } from "./no-journal.decorator";

@Injectable()
export class JournalLogger {
  private logger = new Logger(JournalLogger.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly reflector: Reflector,
  ) {
    this.commandBus.subscribe(async (command: ICommand) => {
      const commandName = command.constructor.name;
      const payload = redactBinaries(command);

      const ignoreCommand = this.reflector.get<boolean | undefined>(
        IGNORE_JOURNAL_KEY,
        command.constructor,
      );

      if (ignoreCommand) {
        return;
      }

      this.logger.trace("Writing journal entry", { commandName, payload });

      await this.commandBus.execute(
        map(CreateJournalEntryCommand, {
          commandName,
          payload,
        }),
      );
    });
  }
}
