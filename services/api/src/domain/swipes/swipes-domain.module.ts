import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Swipe } from "src/infrastructure/database/entities/swipe.entity";

import { SwipeDomainService } from "./services/swipes-domain.service";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Swipe])],
  exports: [SwipeDomainService],
  providers: [SwipeDomainService],
})
export class SwipesDomainModule {}
