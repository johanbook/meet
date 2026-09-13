export interface LogProps {
  level: "debug" | "error" | "fatal" | "info" | "warning";
  msg: string;
  props?: object;
}

export abstract class BaseLogger {
  constructor(readonly name: string) {}

  abstract captureException(error: unknown): void;
  abstract log(props: LogProps): void;

  debug(msg: string, props?: object): void {
    this.log({ level: "debug", msg, props });
  }

  error(msg: string, props?: object): void {
    this.log({ level: "error", msg, props });
  }

  fatal(msg: string, props?: object): void {
    this.log({ level: "fatal", msg, props });
  }

  info(msg: string, props?: object): void {
    this.log({ level: "info", msg, props });
  }

  warn(msg: string, props?: object): void {
    this.log({ level: "warning", msg, props });
  }
}