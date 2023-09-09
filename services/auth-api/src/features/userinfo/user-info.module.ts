import { Module } from "@nestjs/common";

import { UserInfoController } from "./client/controllers/user-info.controller";

@Module({
  imports: [],
  controllers: [UserInfoController],
  providers: [],
})
export class UserInfoModule {}
