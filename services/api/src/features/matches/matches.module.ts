import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotificationModule } from "src/core/notifications/notification.module";
import { ObjectStorageModule } from "src/core/object-storage/object-storage.module";
import { Profile } from "src/features/profiles";
import { ProfileModule } from "src/features/profiles/profile.module";

import { SwipeHandler } from "./application/handlers/command-handlers/swipe.handler";
import { NotifyProfilesOnNewMatch } from "./application/handlers/event-handlers/notify-profiles-on-new-match.handler";
import { GetMatchesHandler } from "./application/handlers/query-handlers/get-matches.handler";
import { SwipeService } from "./domain/services/swipe.service";
import { Swipe } from "./infrastructure/entities/swipe.entity";
import { Match } from "./infrastructure/views/matches.view";

@Module({
  imports: [
    CqrsModule,
    NotificationModule,
    ObjectStorageModule,
    ProfileModule,
    TypeOrmModule.forFeature([Match, Profile, Swipe]),
  ],
  controllers: [],
  providers: [
    GetMatchesHandler,
    NotifyProfilesOnNewMatch,
    SwipeHandler,
    SwipeService,
  ],
})
export class MatchesModule {}
