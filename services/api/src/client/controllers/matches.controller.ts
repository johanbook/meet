import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { GetMatchesQuery } from "src/application/matches/contracts/get-matches.query";
import { AllMatchesDetails } from "src/application/matches/contracts/match.dto";

@Controller("matches")
@ApiTags("matches")
export class MatchesController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getMatches(): Promise<AllMatchesDetails> {
    const query = new GetMatchesQuery();
    return await this.queryBus.execute(query);
  }
}
