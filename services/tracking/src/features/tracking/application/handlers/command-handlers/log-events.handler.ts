import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AsyncLocalStorage } from "node:async_hooks";

import { Logger } from "src/core/logging/logger.service";
import { REQUEST_CONTEXT_KEY } from "src/core/request-context/als.module";
import { RequestContext } from "src/core/request-context/request-context.interface";

import { LogEventsCommand } from "../../contracts/commands/log-events.command";

@CommandHandler(LogEventsCommand)
export class LogEventsHandler
  implements ICommandHandler<LogEventsCommand, void>
{
  private logger = new Logger(LogEventsHandler.name);

  constructor(
    @Inject(REQUEST_CONTEXT_KEY)
    private readonly requestContext: AsyncLocalStorage<RequestContext>,
  ) {}

  async execute(command: LogEventsCommand) {
    for (const event of command.events) {
      const requestData = this.getRequestData();
      this.logger.log({ ...event, ...requestData });
    }
  }

  private getRequestData(): object {
    const store = this.requestContext.getStore();

    return {
      userAgent: store.userAgent,
      userId: store.userId,
    };
  }
}
