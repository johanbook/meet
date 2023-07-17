import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { MatchesModule } from "./matches/matches.module";
import { SwipesModule } from "./swipes/swipes.module";

@Module({
  imports: [CqrsModule, MatchesModule, SwipesModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
