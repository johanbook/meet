import { Logger as TypeOrmBaseLogger } from "typeorm";

import { Logger } from "./logger.service";

export class TypeOrmLogger implements TypeOrmBaseLogger {
  private logger = new Logger("typeorm");

  log(level: "log" | "info" | "warn", message: any): void {
    switch (level) {
      case "info": {
        this.logger.log(message);
        break;
      }
      case "log": {
        this.logger.log(message);
        break;
      }
      case "warn": {
        this.logger.warn(message);
        break;
      }
    }
  }

  logQuery(query: string, parameters?: any[]): void {
    this.logger.debug({ query, parameters });
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
  ): void {
    this.logger.debug({ error, query, parameters });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    this.logger.debug({ time, query, parameters });
  }

  logSchemaBuild(message: string): void {
    this.logger.debug(message);
  }

  logMigration(message: string): void {
    this.logger.debug(message);
  }
}
