import { Module } from "@nestjs/common";

import { ObjectStorageService } from "./object-storage.service";

@Module({
  exports: [ObjectStorageService],
  providers: [ObjectStorageService],
})
export class ObjectStorageModule {}
