import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CommandLogger } from "./command.logger";
import { EventLogger } from "./event.logger";

@Module({
  exports: [],
  imports: [CqrsModule],
  controllers: [],
  providers: [CommandLogger, EventLogger],
})
export class LoggingModule {}
