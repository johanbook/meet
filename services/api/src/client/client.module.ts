import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApplicationModule } from "src/application/application.module";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { ChatsController } from "./controllers/chats.controller";
import { MatchesController } from "./controllers/matches.controller";
import { PhotosController } from "./controllers/photos.controller";
import { ProfileController } from "./controllers/profile.controller";
import { SwipesController } from "./controllers/swipes.controller";
import { NotificationsGateway } from "./gateways/notifications.gateway";

@Module({
  imports: [CqrsModule, ApplicationModule, TypeOrmModule.forFeature([Profile])],
  controllers: [
    ChatsController,
    MatchesController,
    PhotosController,
    ProfileController,
    SwipesController,
  ],
  providers: [NotificationsGateway],
})
export class ClientModule {}
