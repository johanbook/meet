import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { RequestContextModule } from "src/core/request-context/request-context.module";

import { LogEventsHandler } from "./application/handlers/command-handlers/log-events.handler";
import { TrackEventsHandler } from "./application/handlers/command-handlers/track-events.handler";
import { TrackingController } from "./client/controllers/tracking.controller";

@Module({
  imports: [CqrsModule, RequestContextModule],
  controllers: [TrackingController],
  providers: [LogEventsHandler, TrackEventsHandler],
})
export class TrackingModule {}
