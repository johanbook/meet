import { Injectable } from "@nestjs/common";
import { MinioService } from "nestjs-minio-client";
import { Readable as ReadableStream } from "node:stream";
import { v4 as uuidv4 } from "uuid";

import { BUCKET_NAMES } from "./buckets.config";
import { minioOptions } from "./minio.config";
import { createPublicBucketPolicy } from "./policies";

type ValueOf<T> = T[keyof T];
type BucketName = ValueOf<typeof BUCKET_NAMES>;

interface PutResult {
  id: string;
  url: string;
}

@Injectable()
export class ObjectStorageService {
  constructor(private readonly minioService: MinioService) {
    this.setupObjectStorage();
  }

  private setupObjectStorage(): void {
    const bucketNames = Object.values(BUCKET_NAMES);

    for (const bucketName of bucketNames) {
      this.setupBucket(bucketName);
    }
  }

  private async setupBucket(bucketName: string): Promise<void> {
    const client = this.minioService.client;
    const bucketExists = await client.bucketExists(bucketName);

    if (bucketExists) {
      return;
    }

    await client.makeBucket(bucketName);
    await this.makeBucketPublic(bucketName);
  }

  private async makeBucketPublic(bucketName: string): Promise<void> {
    const client = this.minioService.client;
    const policy = createPublicBucketPolicy({ bucketName });
    await client.setBucketPolicy(bucketName, JSON.stringify(policy));
  }

  async delete(bucketName: BucketName, id: string): Promise<void> {
    const client = this.minioService.client;

    await client.removeObject(bucketName, id);
  }

  async put(
    bucketName: BucketName,
    stream: ReadableStream | Buffer | string,
  ): Promise<PutResult> {
    const client = this.minioService.client;
    const id = uuidv4();

    await client.putObject(bucketName, id, stream);

    return { id, url: id };
  }

  getUrl(bucketName: BucketName, objectId: string): string {
    return `${minioOptions.publicEndpoint}/${bucketName}/${objectId}`;
  }
}
