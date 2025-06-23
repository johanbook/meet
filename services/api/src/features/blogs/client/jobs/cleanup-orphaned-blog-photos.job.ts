import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ObjectStorageService } from "src/core/object-storage";
import { BUCKET_NAMES } from "src/core/object-storage/buckets.config";

import { BlogPostPhoto } from "../../infrastructure/entities/blog-post-photo.entity";

@Injectable()
export class CleanupOrphanedBlogPhotosJob {
  private readonly logger = new Logger(CleanupOrphanedBlogPhotosJob.name);

  constructor(
    private readonly objectStorageService: ObjectStorageService,
    @InjectRepository(BlogPostPhoto)
    private readonly blogPostPhotoRepo: Repository<BlogPostPhoto>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCleanup(): Promise<void> {
    this.logger.log("Starting orphaned blog photo cleanup job...");

    const minioObjectIds = await this.objectStorageService.listObjectIds(
      BUCKET_NAMES.BLOG_POST_PHOTO,
    );

    const pgIds = await this.blogPostPhotoRepo.find({
      select: ["objectId"],
    });
    const pgObjectIds = new Set(pgIds.map((p) => p.objectId));

    const orphaned = minioObjectIds.filter((id) => !pgObjectIds.has(id));

    let deletedCount = 0;

    for (const id of orphaned) {
      try {
        await this.objectStorageService.delete(
          BUCKET_NAMES.BLOG_POST_PHOTO,
          id,
        );

        deletedCount++;
      } catch (error) {
        this.logger.error("Failed to delete orphaned photo", { id, error });
      }
    }
    this.logger.log("Cleaned up orphaned photos", { deletedCount });
  }
}
