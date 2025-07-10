import { BaseLogger, LogProps } from "./base.logger";

export class ConsoleLogger extends BaseLogger {
  captureException(error: unknown) {
    this.error("", { error });
  }

  log({ level, msg, props }: LogProps): void {
    const message = `${this.name}: ${msg}`;

    switch (level) {
      case "debug": {
        console.debug(message, props);
        return;
      }
      case "error":
      case "fatal": {
        console.error(message, props);
        return;
      }
      case "info": {
        console.info(message, props);
        return;
      }
      case "trace": {
        console.trace(message, props);
        return;
      }
      case "warn": {
        console.warn(message, props);
        return;
      }
    }
  }
}
