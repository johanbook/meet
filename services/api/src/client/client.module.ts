import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApplicationModule } from "src/application/application.module";
import { Profile } from "src/features/profiles";

import { MatchesController } from "./controllers/matches.controller";
import { SwipesController } from "./controllers/swipes.controller";

@Module({
  imports: [CqrsModule, ApplicationModule, TypeOrmModule.forFeature([Profile])],
  controllers: [MatchesController, SwipesController],
  providers: [],
})
export class ClientModule {}
