import { LoggerService } from "@nestjs/common";
import * as pino from "pino";

export function getLogLevel(): string {
  const level = process.env.LOG_LEVEL || "info";
  return level.toLowerCase();
}

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

  const level = getLogLevel();

  return {
    formatters: {
      // Log level as string as most log viewers can parse not natively
      level: (label) => ({ level: label }),
    },
    level,
    name,
    transport,
  };
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
