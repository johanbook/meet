import { captureException, captureMessage } from "@sentry/react";

import { BaseLogger, LogProps } from "./base.logger";

export class SentryLogger extends BaseLogger {
  captureException(error: unknown) {
    captureException(error);
  }

  log({ level, msg, ...extra }: LogProps): void {
    const message = `${this.name}: ${msg}`;
    captureMessage(message, { level, extra });
  }
}
