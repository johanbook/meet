import { ConsoleLogger } from "./console.logger";
import { SentryLogger } from "./sentry.logger";

export const Logger = import.meta.env.PROD ? SentryLogger : ConsoleLogger;

export function registerExceptionLogger(): void {
  const logger = new Logger("ExceptionLogger");

  window.addEventListener("error", (event) => {
    const error = event.error;
    logger.error(event.message, { stackTrace: error.stack });
  });

  window.addEventListener("unhandledrejection", (event) => {
    logger.error("There was an unhandled rejection", { reason: event.reason });
  });
}
