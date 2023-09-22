import { Injectable } from "@nestjs/common";
import { Constructor } from "@nestjs/cqrs";
import Jimp from "jimp";

import {
  BucketName,
  IStorableObject,
  ObjectStorageService,
} from "src/core/object-storage";

import { BasePhoto } from "./photo.entity";

interface ResizeOptions {
  height?: number;
  width?: number;
}

@Injectable()
export class PhotoService {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  async resize(buffer: Buffer, options: ResizeOptions): Promise<Buffer> {
    const jimp = await Jimp.read(buffer);

    const { width, height } = options;

    return jimp
      .resize(width || Jimp.AUTO, height || Jimp.AUTO)
      .getBufferAsync(Jimp.MIME_PNG);
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
