import { Module } from "@nestjs/common";

import { CommandLogger } from "./command.logger";
import { EventLogger } from "./event.logger";

@Module({
  exports: [],
  imports: [],
  controllers: [],
  providers: [CommandLogger, EventLogger],
})
export class LoggingModule {}
