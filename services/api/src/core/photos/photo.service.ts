import { Injectable } from "@nestjs/common";
import { Constructor } from "@nestjs/cqrs";

import {
  BucketName,
  IStorableObject,
  ObjectStorageService,
} from "src/core/object-storage";

import { BasePhoto } from "./photo.entity";

@Injectable()
export class PhotoService {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  async uploadPhoto<T extends BasePhoto>(
    cls: Constructor<T>,
    bucketName: BucketName,
    file: IStorableObject,
  ): Promise<T> {
    const objectMetadata = await this.objectStorageService.put(
      bucketName,
      file,
    );

    const photo = new cls();
    photo.objectId = objectMetadata.id;

    return photo;
  }
}
