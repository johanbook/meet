import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Logger } from "src/core/logging";
import { ObjectStorageService } from "src/core/object-storage";
import { BUCKET_NAMES } from "src/core/object-storage/buckets.config";

import { BlogPostPhoto } from "../../infrastructure/entities/blog-post-photo.entity";

@Injectable()
export class CleanupOrphanedBlogPhotosJob {
  private readonly logger = new Logger(CleanupOrphanedBlogPhotosJob.name);

  constructor(
    @InjectRepository(BlogPostPhoto)
    private readonly blogPostPhotoRepo: Repository<BlogPostPhoto>,
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  private async deleteOrphanedPhoto(
    id: string,
    callback: () => void,
  ): Promise<void> {
    try {
      await this.objectStorageService.delete(BUCKET_NAMES.BLOG_POST_PHOTO, id);

      callback();
    } catch (error) {
      this.logger.error("Failed to delete orphaned photo", { id, error });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCleanup(): Promise<void> {
    this.logger.log("Starting job");

    const minioObjectIds = await this.objectStorageService.listObjectIds(
      BUCKET_NAMES.BLOG_POST_PHOTO,
    );

    const pgIds = await this.blogPostPhotoRepo.find({
      select: ["objectId"],
    });
    const pgObjectIds = new Set(pgIds.map((p) => p.objectId));

    const orphaned = minioObjectIds.filter((id) => !pgObjectIds.has(id));

    if (orphaned.length === 0) {
      return this.logger.log("Found no orphaned photos to delete");
    }

    this.logger.log("Starting to delete orphaned photos", {
      photosToBeDeleted: orphaned.length,
    });

    let deletedCount = 0;

    await Promise.all(
      orphaned.map((id) => this.deleteOrphanedPhoto(id, () => deletedCount++)),
    );

    this.logger.log("Cleaned up orphaned photos", { deletedCount });
  }
}
