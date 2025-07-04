import { captureException } from "@sentry/react";

type LogLevel = "debug" | "error" | "fatal" | "info" | "trace" | "warn";

interface LogProps {
  level: LogLevel;
  msg: string;
  props?: object;
}

export class Logger {
  constructor(private readonly name: string) {}

  captureException(error: unknown) {
    captureException(error);
  }

  debug(msg: string, props?: object) {
    this.log({ level: "debug", msg, props });
  }

  error(msg: string, props?: object) {
    this.log({ level: "error", msg, props });
  }

  fatal(msg: string, props?: object) {
    this.log({ level: "fatal", msg, props });
  }

  info(msg: string, props?: object) {
    this.log({ level: "info", msg, props });
  }

  trace(msg: string, props?: object) {
    this.log({ level: "trace", msg, props });
  }

  warn(msg: string, props?: object) {
    this.log({ level: "warn", msg, props });
  }

  private log({ props, ...other }: LogProps): void {
    const logProps = { ...other, props: { ...props, name: this.name } };

    if (process.env.NODE_ENV === "development") {
      this.consoleLog(logProps);
    }
  }

  private consoleLog({ level, msg, props }: LogProps): void {
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
      default: {
        throw new Error(`Unknown logging level '${level}'`);
      }
    }
  }
}

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
