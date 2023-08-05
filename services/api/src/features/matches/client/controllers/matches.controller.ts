import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { AllMatchesDetails } from "../..//application/contracts/dtos/match.dto";
import { SwipeCommand } from "../../application/contracts/commands/swipe.command";
import { GetMatchesQuery } from "../../application/contracts/queries/get-matches.query";

@Controller("matches")
@ApiTags("matches")
export class MatchesController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getMatches(
    @Query() query: GetMatchesQuery,
  ): Promise<AllMatchesDetails> {
    return await this.queryBus.execute(query);
  }

  @Post("/swipe")
  async swipe(@Body() command: SwipeCommand): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
