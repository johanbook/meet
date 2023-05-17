import { Module } from "@nestjs/common";

import { AuthenticationController } from "./authentication.controller";

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [],
})
export class AuthenticationModule {}
