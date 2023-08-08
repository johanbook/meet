import { Module } from "@nestjs/common";

import { RequestContextModule } from "src/core/request-context/request-context.module";

import { UserIdService } from "./user-id.service";

@Module({
  controllers: [],
  exports: [UserIdService],
  imports: [RequestContextModule],
  providers: [UserIdService],
})
export class AuthenticationModule {}
