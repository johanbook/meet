import { BaseLogger, LogProps } from "./base.logger";

const LEVEL_METHOD: Record<LogProps["level"], "debug" | "error" | "info" | "warn"> = {
  debug: "debug",
  error: "error",
  fatal: "error",
  info: "info",
  warning: "warn",
};

export class ConsoleLogger extends BaseLogger {
  log({ level, msg, props }: LogProps): void {
    const method = LEVEL_METHOD[level];

    if (props) {
      console[method](`${this.name}: ${msg}`, props);
    } else {
      console[method](`${this.name}: ${msg}`);
    }
  }

  captureException(error: unknown): void {
    console.error(error);
  }
}