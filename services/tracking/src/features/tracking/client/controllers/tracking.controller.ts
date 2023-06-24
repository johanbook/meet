import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { TrackEventCommand } from "../../application/contracts/commands/track-event.command";

@Controller("tracking")
@ApiTags("tracking")
export class TrackingController {
  constructor(private commandBus: CommandBus) {}

  @Post("/log")
  async logEvent(@Body() command: TrackEventCommand): Promise<void> {
    return await this.commandBus.execute(command);
  }
}
