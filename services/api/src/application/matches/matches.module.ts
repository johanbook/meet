import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ObjectStorageModule } from "src/core/object-storage/object-storage.module";
import { ProfileDomainModule } from "src/domain/profiles/profile-domain.module";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Match } from "src/infrastructure/database/views/matches.view";

import { GetMatchesHandler } from "./queryHandlers/get-matches.handler";

@Module({
  imports: [
    ObjectStorageModule,
    ProfileDomainModule,
    TypeOrmModule.forFeature([Match, Profile]),
  ],
  controllers: [],
  providers: [GetMatchesHandler],
})
export class MatchesModule {}
