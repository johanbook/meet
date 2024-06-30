import { Logger as TypeOrmBaseLogger } from "typeorm";

import { Logger } from "src/core/logging";

export class TypeOrmLogger implements TypeOrmBaseLogger {
  private logger = new Logger(TypeOrmLogger.name);

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
    this.logger.debug("Executing query", { query, parameters });
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
  ): void {
    this.logger.debug("Encountered error in query", {
      error,
      query,
      parameters,
    });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    this.logger.debug("Executing slow query", { time, query, parameters });
  }

  logSchemaBuild(message: string): void {
    this.logger.debug(message);
  }

  logMigration(message: string): void {
    this.logger.debug(message);
  }
}
