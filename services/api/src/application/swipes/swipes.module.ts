import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotificationsGateway } from "src/client/gateways/notifications.gateway";
import { ProfileDomainModule } from "src/domain/profiles/profile-domain.module";
import { SwipesDomainModule } from "src/domain/swipes/swipes-domain.module";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";

import { SwipeHandler } from "./commandHandlers/swipe.handler";
import { NotifyProfilesOnNewMatch } from "./eventHandlers/notify-profiles-on-new-match.handler";

@Module({
  imports: [
    ProfileDomainModule,
    SwipesDomainModule,
    TypeOrmModule.forFeature([Profile, Swipe]),
  ],
  controllers: [],
  providers: [NotificationsGateway, NotifyProfilesOnNewMatch, SwipeHandler],
})
export class SwipesModule {}
