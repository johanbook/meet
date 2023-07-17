import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ObjectStorageModule } from "src/core/object-storage/object-storage.module";
import { ProfileDomainModule } from "src/domain/profiles/profile-domain.module";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { AddPhotoHandler } from "./application/handlers/command-handlers/add-photo.handler";
import { RemovePhotoHandler } from "./application/handlers/command-handlers/remove-photo.handler";
import { PhotosController } from "./client/controllers/photos.controller";
import { ProfilePhoto } from "./infrastructure/entities/profile-photo.entity";

@Module({
  imports: [
    CqrsModule,
    ObjectStorageModule,
    ProfileDomainModule,
    TypeOrmModule.forFeature([Profile]),
    TypeOrmModule.forFeature([ProfilePhoto]),
  ],
  controllers: [PhotosController],
  providers: [AddPhotoHandler, RemovePhotoHandler],
})
export class PhotosModule {}
