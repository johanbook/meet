import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/features/profiles";

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [],
  providers: [],
})
export class ClientModule {}
