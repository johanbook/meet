import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Match } from "src/infrastructure/database/views/matches.view";
import { MapperModule } from "src/utils/mapper/mapper.module";

import { MatchDetailsMapper } from "./mappers/match.mapper";
import { GetMatchesHandler } from "./queryHandlers/get-matches.handler";

@Module({
  imports: [MapperModule, TypeOrmModule.forFeature([Match, Profile])],
  controllers: [],
  providers: [GetMatchesHandler, MatchDetailsMapper],
})
export class MatchesModule {}
