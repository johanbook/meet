import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";

import { SwipeHandler } from "./commandHandlers/swipe.handler";

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Swipe])],
  controllers: [],
  providers: [SwipeHandler],
})
export class SwipesModule {}
