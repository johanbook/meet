import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { SwipeDetails } from "src/application/swipes/contracts/swipe-details.dto";
import { SwipeCommand } from "src/application/swipes/contracts/swipe.command";

@Controller("swipes")
@ApiTags("swipes")
export class SwipesController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async swipe(@Body() command: SwipeCommand): Promise<SwipeDetails> {
    return await this.commandBus.execute(command);
  }
}
