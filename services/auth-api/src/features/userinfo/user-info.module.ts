import { Module } from "@nestjs/common";

import { UserInfoController } from "./user-info.controller";

@Module({
  imports: [],
  controllers: [UserInfoController],
  providers: [],
})
export class UserInfoModule {}
