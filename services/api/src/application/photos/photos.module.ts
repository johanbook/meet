import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProfileDomainModule } from "src/domain/profiles/profile-domain.module";
import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";

import { AddPhotoHandler } from "./commandHandlers/add-photo.handler";
import { RemovePhotoHandler } from "./commandHandlers/remove-photo.handler";

@Module({
  imports: [
    ProfileDomainModule,
    TypeOrmModule.forFeature([Profile]),
    TypeOrmModule.forFeature([ProfilePhoto]),
  ],
  controllers: [],
  providers: [AddPhotoHandler, RemovePhotoHandler, ObjectStorageService],
})
export class PhotosModule {}
