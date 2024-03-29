import { Injectable } from "@nestjs/common";
import { UnhandledExceptionBus } from "@nestjs/cqrs";

import { Logger } from "./domain/services/logger.service";

@Injectable()
export class UnhandledExceptionLogger {
  private logger = new Logger(UnhandledExceptionLogger.name);

  constructor(private readonly unhandledExceptionBus: UnhandledExceptionBus) {
    this.unhandledExceptionBus.subscribe((exceptionInfo) => {
      this.logger.error(
        `Encountered unhandled exception ${exceptionInfo.exception.message}`,
        {
          cause: exceptionInfo.cause,
          error: exceptionInfo.exception,
        },
      );
    });
  }
}
