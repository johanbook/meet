type LogLevel = "debug" | "error" | "fatal" | "info" | "trace" | "warn";

export interface LogProps {
  level: LogLevel;
  msg: string;
  props?: object;
}

export abstract class BaseLogger {
  constructor(readonly name: string) {}

  abstract captureException(error: unknown): void;

  abstract log(props: LogProps): void;

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
}
