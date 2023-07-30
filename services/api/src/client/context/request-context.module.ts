import { Global, Module } from "@nestjs/common";

import { AlsModule } from "./als.module";
import { RequestContextMiddleware } from "./request-context.middleware";
import { UserIdService } from "./user-id.service";

@Global()
@Module({
  imports: [AlsModule, RequestContextMiddleware],
  providers: [UserIdService],
  exports: [UserIdService, AlsModule],
})
export class RequestContextModule {}
