import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApplicationModule } from "src/application/application.module";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { MatchesController } from "./controllers/matches.controller";
import { PhotosController } from "./controllers/photos.controller";
import { ProfileController } from "./controllers/profile.controller";
import { SwipesController } from "./controllers/swipes.controller";

@Module({
  imports: [CqrsModule, ApplicationModule, TypeOrmModule.forFeature([Profile])],
  controllers: [
    MatchesController,
    PhotosController,
    ProfileController,
    SwipesController,
  ],
  providers: [],
})
export class ClientModule {}
