import { Module } from "@nestjs/common";

import { ChatsModule } from "./chats/chats.module";
import { MatchesModule } from "./matches/matches.module";
import { PhotosModule } from "./photos/photos.module";
import { ProfileModule } from "./profile/profile.module";
import { SwipesModule } from "./swipes/swipes.module";

@Module({
  imports: [
    ChatsModule,
    MatchesModule,
    PhotosModule,
    ProfileModule,
    SwipesModule,
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
