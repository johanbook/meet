import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CommandLogger } from "./command.logger";
import { EventLogger } from "./event.logger";
import { UnhandledExceptionLogger } from "./unhandled-exception.logger";

@Module({
  exports: [],
  imports: [CqrsModule],
  controllers: [],
  providers: [CommandLogger, EventLogger, UnhandledExceptionLogger],
})
export class LoggingModule {}
