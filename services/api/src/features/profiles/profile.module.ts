import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { ObjectStorageModule } from "src/core/object-storage/object-storage.module";
import { PhotosModule } from "src/core/photos/photos.module";

import { CreateProfileHandler } from "./application/handlers/command-handlers/create-profile.handler";
import { UpdateProfilePhotoHandler } from "./application/handlers/command-handlers/update-profile-photo.handler";
import { UpdateProfileHandler } from "./application/handlers/command-handlers/update-profile.handler";
import { CheckIfProfileExistsHandler } from "./application/handlers/query-handlers/check-if-profile-exists.handler";
import { GetProfileHandler } from "./application/handlers/query-handlers/get-profile.handler";
import { ProfileController } from "./client/controllers/profile.controller";
import { CurrentProfileService } from "./domain/services/current-profile.service";
import { ProfileService } from "./domain/services/profile.service";
import { ProfilePhoto } from "./infrastructure/entities/profile-photo.entity";
import { Profile } from "./infrastructure/entities/profile.entity";

@Module({
  controllers: [ProfileController],
  exports: [CurrentProfileService],
  imports: [
    AuthenticationModule,
    CqrsModule,
    ObjectStorageModule,
    PhotosModule,
    TypeOrmModule.forFeature([Profile, ProfilePhoto]),
  ],
  providers: [
    CurrentProfileService,
    CheckIfProfileExistsHandler,
    CreateProfileHandler,
    GetProfileHandler,
    ProfileService,
    UpdateProfileHandler,
    UpdateProfilePhotoHandler,
  ],
})
export class ProfileModule {}
