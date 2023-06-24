import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { TrackEventHandler } from "./application/handlers/command-handlers/track-event.handler";
import { TrackingController } from "./client/controllers/tracking.controller";

@Module({
  imports: [CqrsModule],
  controllers: [TrackingController],
  providers: [TrackEventHandler],
})
export class TrackingModule {}
