import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotificationModule } from "src/core/notifications/notification.module";
import { ProfileDomainModule } from "src/domain/profiles/profile-domain.module";
import { SwipesDomainModule } from "src/domain/swipes/swipes-domain.module";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";

import { SwipeHandler } from "./commandHandlers/swipe.handler";
import { NotifyProfilesOnNewMatch } from "./eventHandlers/notify-profiles-on-new-match.handler";

@Module({
  imports: [
    NotificationModule,
    ProfileDomainModule,
    SwipesDomainModule,
    TypeOrmModule.forFeature([Profile, Swipe]),
  ],
  controllers: [],
  providers: [NotifyProfilesOnNewMatch, SwipeHandler],
})
export class SwipesModule {}
