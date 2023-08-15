import { Module } from "@nestjs/common";

import { ObjectStorageModule } from "src/core/object-storage/object-storage.module";

import { PhotoService } from "./photo.service";

@Module({
  exports: [PhotoService],
  imports: [ObjectStorageModule],
  controllers: [],
  providers: [PhotoService],
})
export class PhotosModule {}
