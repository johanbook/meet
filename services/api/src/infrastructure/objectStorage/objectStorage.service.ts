import { Injectable } from "@nestjs/common";
import { MinioService } from "nestjs-minio-client";
import { Readable as ReadableStream } from "stream";
import { BUCKET_NAMES } from "./bucketConfig";
import { createPublicBucketPolicy } from "./policies";
import { v4 as uuidv4 } from "uuid";

type ValueOf<T> = T[keyof T];

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

  async put(
    bucketName: ValueOf<typeof BUCKET_NAMES>,
    stream: ReadableStream | Buffer | string,
  ): Promise<PutResult> {
    const client = this.minioService.client;
    const id = uuidv4();

    await client.putObject(bucketName, id, stream);

    return { id, url: id };
  }
}
