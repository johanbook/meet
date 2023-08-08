import { Module } from "@nestjs/common";

import { AlsModule } from "./als.module";
import { RequestContextMiddleware } from "./request-context.middleware";

@Module({
  imports: [AlsModule, RequestContextMiddleware],
  providers: [],
  exports: [AlsModule],
})
export class RequestContextModule {}
