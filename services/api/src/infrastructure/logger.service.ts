import { LoggerService } from "@nestjs/common";
import * as pino from "pino";

export function createPinoLoggerOptions(name: string): pino.pino.LoggerOptions {
  let transport: pino.pino.LoggerOptions["transport"] | undefined;

  if (process.env.NODE_ENV !== "production") {
    transport = {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    };
  }

  return { name, transport };
}

export class Logger implements LoggerService {
  private logger: pino.Logger;

  constructor(name: string) {
    const loggerOptions = createPinoLoggerOptions(name);
    this.logger = pino.pino(loggerOptions);
  }

  debug(message: any): void {
    this.logger.debug(message);
  }

  error(message: any): void {
    this.logger.error(message);
  }

  log(message: any): void {
    this.logger.info(message);
  }

  verbose(message: any): void {
    this.logger.debug(message);
  }

  warn(message: any): void {
    this.logger.warn(message);
  }
}
