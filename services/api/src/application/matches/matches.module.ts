import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ObjectStorageModule } from "src/core/object-storage/object-storage.module";
import { Profile } from "src/features/profiles";
import { ProfileModule } from "src/features/profiles/profile.module";
import { Match } from "src/infrastructure/database/views/matches.view";

import { GetMatchesHandler } from "./queryHandlers/get-matches.handler";

@Module({
  imports: [
    ObjectStorageModule,
    ProfileModule,
    TypeOrmModule.forFeature([Match, Profile]),
  ],
  controllers: [],
  providers: [GetMatchesHandler],
})
export class MatchesModule {}
