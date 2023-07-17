import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CommandLogger } from "./command.logger";
import { EventLogger } from "./event.logger";
import { MatchesModule } from "./matches/matches.module";
import { SwipesModule } from "./swipes/swipes.module";

@Module({
  imports: [CqrsModule, MatchesModule, SwipesModule],
  controllers: [],
  providers: [CommandLogger, EventLogger],
})
export class ApplicationModule {}
