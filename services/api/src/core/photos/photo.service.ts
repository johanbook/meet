import { Injectable } from "@nestjs/common";
import { Constructor } from "@nestjs/cqrs";
import sharp from "sharp";

import {
  BucketName,
  IStorableObject,
  ObjectStorageService,
} from "src/core/object-storage";

import { BasePhoto } from "./photo.entity";

@Injectable()
export class PhotoService {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  getUrl<T extends BasePhoto>(photo: T, bucketName: BucketName): string {
    return this.objectStorageService.getUrl(bucketName, photo.objectId);
  }

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

  async compress(buffer: Buffer, size: [number, number]): Promise<Buffer> {
    return await sharp(buffer)
      .resize(...size)
      .png()
      .toBuffer();
  }
}
