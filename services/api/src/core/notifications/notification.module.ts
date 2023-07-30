import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/features/profiles";

import { NotificationGateway } from "./notification.gateway";
import { NotificationService } from "./notification.service";

@Module({
  exports: [NotificationService],
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
