import { Injectable } from "@nestjs/common";
import { Constructor } from "@nestjs/cqrs";
import Jimp from "jimp";

import {
  BucketName,
  IStorableObject,
  ObjectStorageService,
} from "src/core/object-storage";

import { BasePhoto } from "./photo.entity";

@Injectable()
export class PhotoService {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  async resize(buffer: Buffer, size: [number, number]): Promise<Buffer> {
    const jimp = await Jimp.read(buffer);

    return jimp.resize(...size).getBufferAsync(Jimp.MIME_PNG);
  }

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
}
