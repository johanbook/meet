import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { ProfileService } from "./services/profile.service";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Profile])],
  exports: [ProfileService],
  providers: [ProfileService],
})
export class ProfileDomainModule {}
