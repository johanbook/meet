import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Match } from "src/infrastructure/database/views/matches.view";

import { GetMatchesHandler } from "./queryHandlers/get-matches.handler";

@Module({
  imports: [TypeOrmModule.forFeature([Match, Profile])],
  controllers: [],
  providers: [GetMatchesHandler],
})
export class MatchesModule {}
