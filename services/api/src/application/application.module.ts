import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { ChatsModule } from "./chats/chats.module";
import { CommandLogger } from "./command.logger";
import { EventLogger } from "./event.logger";
import { MatchesModule } from "./matches/matches.module";
import { PhotosModule } from "./photos/photos.module";
import { ProfileModule } from "./profile/profile.module";
import { SwipesModule } from "./swipes/swipes.module";

@Module({
  imports: [
    CqrsModule,
    ChatsModule,
    MatchesModule,
    PhotosModule,
    ProfileModule,
    SwipesModule,
  ],
  controllers: [],
  providers: [CommandLogger, EventLogger],
})
export class ApplicationModule {}
