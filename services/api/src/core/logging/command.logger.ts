import { Injectable } from "@nestjs/common";
import { CommandBus, ICommand } from "@nestjs/cqrs";

import { stringifyAndRedactBinary } from "src/utils/string.helper";

import { Logger } from "./domain/services/logger.service";

@Injectable()
export class CommandLogger {
  private logger = new Logger(CommandLogger.name);

  constructor(private readonly commandBus: CommandBus) {
    this.commandBus.subscribe((command: ICommand) => {
      const commandName = command.constructor.name;
      this.logger.debug(`Executed ${commandName}`, {
        args: stringifyAndRedactBinary(command),
        command: commandName,
      });
    });
  }
}
