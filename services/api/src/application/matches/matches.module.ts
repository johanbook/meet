import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProfileDomainModule } from "src/domain/profiles/profile-domain.module";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Match } from "src/infrastructure/database/views/matches.view";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";

import { GetMatchesHandler } from "./queryHandlers/get-matches.handler";

@Module({
  imports: [ProfileDomainModule, TypeOrmModule.forFeature([Match, Profile])],
  controllers: [],
  providers: [GetMatchesHandler, ObjectStorageService],
})
export class MatchesModule {}
