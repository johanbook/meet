import { Global, Module } from "@nestjs/common";

import { AlsModule } from "./als.module";
import { UserIdModule } from "./user-id.module";
import { UserIdService } from "./user-id.service";

@Global()
@Module({
  imports: [AlsModule, UserIdModule],
  providers: [UserIdService],
  exports: [UserIdService, AlsModule],
})
export class ContextModule {}
