import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { AddPhotoHandler } from "./commandHandlers/add-photo.handler";
import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    TypeOrmModule.forFeature([ProfilePhoto]),
  ],
  controllers: [],
  providers: [AddPhotoHandler, ObjectStorageService],
})
export class PhotosModule {}
