import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { GetProfileHandler } from "./queryHandlers/get-profile.handler";
import { UpdateProfileHandler } from "./commandHandlers/update-profile.handler";
import { GetProfilesNearbyHandler } from "./queryHandlers/get-profiles-nearby.handler";
import { CreateProfileHandler } from "./commandHandlers/create-profile.handler";

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [],
  providers: [
    CreateProfileHandler,
    GetProfileHandler,
    GetProfilesNearbyHandler,
    UpdateProfileHandler,
  ],
})
export class ProfileModule {}
