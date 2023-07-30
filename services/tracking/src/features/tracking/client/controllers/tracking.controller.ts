import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { LogEventsCommand } from "../../application/contracts/commands/log-events.command";
import { TrackEventsCommand } from "../../application/contracts/commands/track-event.command";

@Controller("tracking")
@ApiTags("tracking")
export class TrackingController {
  constructor(private commandBus: CommandBus) {}

  @Post("/")
  async trackEvents(@Body() command: TrackEventsCommand): Promise<void> {
    return await this.commandBus.execute(command);
  }

  @Post("/log")
  async logEvents(@Body() command: LogEventsCommand): Promise<void> {
    return await this.commandBus.execute(command);
  }
}
