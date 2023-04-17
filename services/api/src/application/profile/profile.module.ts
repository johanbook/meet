import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { CreateProfileHandler } from "./commandHandlers/create-profile.handler";
import { UpdateProfileHandler } from "./commandHandlers/update-profile.handler";
import { CheckIfProfileExistsHandler } from "./queryHandlers/check-if-profile-exists.handler";
import { GetProfileHandler } from "./queryHandlers/get-profile.handler";
import { GetProfilesNearbyHandler } from "./queryHandlers/get-profiles-nearby.handler";

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [],
  providers: [
    CheckIfProfileExistsHandler,
    CreateProfileHandler,
    GetProfileHandler,
    GetProfilesNearbyHandler,
    UpdateProfileHandler,
  ],
})
export class ProfileModule {}
