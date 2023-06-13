import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ObjectStorageModule } from "src/core/object-storage/object-storage.module";
import { ProfileDomainModule } from "src/domain/profiles/profile-domain.module";
import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { AddPhotoHandler } from "./commandHandlers/add-photo.handler";
import { RemovePhotoHandler } from "./commandHandlers/remove-photo.handler";

@Module({
  imports: [
    ObjectStorageModule,
    ProfileDomainModule,
    TypeOrmModule.forFeature([Profile]),
    TypeOrmModule.forFeature([ProfilePhoto]),
  ],
  controllers: [],
  providers: [AddPhotoHandler, RemovePhotoHandler],
})
export class PhotosModule {}
