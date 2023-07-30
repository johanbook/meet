import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ObjectStorageModule } from "src/core/object-storage/object-storage.module";

import { CreateProfileHandler } from "./application/handlers/command-handlers/create-profile.handler";
import { UpdateProfileHandler } from "./application/handlers/command-handlers/update-profile.handler";
import { CheckIfProfileExistsHandler } from "./application/handlers/query-handlers/check-if-profile-exists.handler";
import { GetProfileHandler } from "./application/handlers/query-handlers/get-profile.handler";
import { GetProfilesNearbyHandler } from "./application/handlers/query-handlers/get-profiles-nearby.handler";
import { ProfileController } from "./client/controllers/profile.controller";
import { CurrentProfileService } from "./domain/services/current-profile.service";
import { ProfileService } from "./domain/services/profile.service";
import { Profile } from "./infrastructure/entities/profile.entity";

@Module({
  controllers: [ProfileController],
  exports: [CurrentProfileService],
  imports: [
    CqrsModule,
    ObjectStorageModule,
    TypeOrmModule.forFeature([Profile]),
  ],
  providers: [
    CurrentProfileService,
    CheckIfProfileExistsHandler,
    CreateProfileHandler,
    GetProfileHandler,
    GetProfilesNearbyHandler,
    ProfileService,
    UpdateProfileHandler,
  ],
})
export class ProfileModule {}
