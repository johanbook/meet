/* eslint-disable no-console */
/* eslint-disable sonarjs/no-identical-functions */

export class Logger {
  constructor(private readonly name: string) {}

  debug(msg: string, props?: object) {
    console.debug({
      name: this.name,
      msg,
      ...props,
    });
  }

  error(msg: string, props?: object) {
    console.error({
      name: this.name,
      msg,
      ...props,
    });
  }

  fatal(msg: string, props?: object) {
    console.error({
      name: this.name,
      msg,
      ...props,
    });
  }

  info(msg: string, props?: object) {
    console.info({
      name: this.name,
      msg,
      ...props,
    });
  }

  trace(msg: string, props?: object) {
    console.trace({
      name: this.name,
      msg,
      ...props,
    });
  }

  warn(msg: string, props?: object) {
    console.warn({
      name: this.name,
      msg,
      ...props,
    });
  }
}

export function registerExceptionLogger(): void {
  const logger = new Logger("ExceptionLogger");

  window.addEventListener("error", (event) => {
    const error = event.error;
    logger.error(event.message, { stackTrace: error.stack });
  });
}
