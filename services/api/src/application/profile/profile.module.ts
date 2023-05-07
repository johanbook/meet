import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProfileDomainModule } from "src/domain/profiles/profile-domain.module";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";

import { CreateProfileHandler } from "./commandHandlers/create-profile.handler";
import { UpdateProfileHandler } from "./commandHandlers/update-profile.handler";
import { CheckIfProfileExistsHandler } from "./queryHandlers/check-if-profile-exists.handler";
import { GetProfileHandler } from "./queryHandlers/get-profile.handler";
import { GetProfilesNearbyHandler } from "./queryHandlers/get-profiles-nearby.handler";

@Module({
  imports: [ProfileDomainModule, TypeOrmModule.forFeature([Profile])],
  controllers: [],
  providers: [
    CheckIfProfileExistsHandler,
    CreateProfileHandler,
    GetProfileHandler,
    GetProfilesNearbyHandler,
    ObjectStorageService,
    UpdateProfileHandler,
  ],
})
export class ProfileModule {}
