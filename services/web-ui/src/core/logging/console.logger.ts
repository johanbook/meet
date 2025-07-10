import { BaseLogger, LogProps } from "./base.logger";

export class ConsoleLogger extends BaseLogger {
  captureException(error: unknown) {
    this.error("Captured Exception", { error });
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
      case "warning": {
        console.warn(message, props);
        return;
      }
    }
  }
}
