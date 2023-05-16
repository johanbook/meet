import { Injectable } from "@nestjs/common";
import { CommandBus, ICommand } from "@nestjs/cqrs";

import { Logger } from "src/infrastructure/logger.service";

@Injectable()
export class CommandLogger {
  private logger = new Logger(CommandLogger.name);

  constructor(private readonly commandBus: CommandBus) {
    this.commandBus.subscribe((command: ICommand) => {
      this.logger.debug({
        command,
        msg: `Executed ${command.constructor.name}`,
      });
    });
  }
}
