import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GetClassificationsByCategoryHandler } from "./application/handlers/query-handlers/get-classifications-by-category.handler";
import { ClassificationsController } from "./client/controllers/classifications.controller";
import { ClassificationService } from "./domain/services/classification.service";
import { Classification } from "./infrastructure/entities/classification.entity";

@Module({
  exports: [ClassificationService],
  imports: [CqrsModule, TypeOrmModule.forFeature([Classification])],
  controllers: [ClassificationsController],
  providers: [ClassificationService, GetClassificationsByCategoryHandler],
})
export class ClassificationsModule {}
