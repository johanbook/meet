import { captureException, captureMessage } from "@sentry/react";

import { BaseLogger, LogProps } from "./base.logger";

export class SentryLogger extends BaseLogger {
  captureException(error: unknown) {
    captureException(error);
  }

  log({ level, msg }: LogProps): void {
    const message = `${this.name}: ${msg}`;

    switch (level) {
      case "error": {
        captureMessage(message, "error");
        return;
      }
      case "fatal": {
        captureMessage(message, "fatal");
        return;
      }
      case "info": {
        captureMessage(message, "info");
        return;
      }
      case "debug":
      case "trace": {
        captureMessage(message, "debug");
        return;
      }
      case "warn": {
        captureMessage(message, "warning");
        return;
      }
    }
  }
}
