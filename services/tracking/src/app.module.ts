import { Module } from "@nestjs/common";

import { TrackingModule } from "./features/tracking/tracking.module";

@Module({
  imports: [TrackingModule],
  providers: [],
})
export class AppModule {}
