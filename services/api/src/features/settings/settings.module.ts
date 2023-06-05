import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UpdateSettingsHandler } from "./application/handlers/command-handlers/update-settings.handler";
import { GetSettingsHandler } from "./application/handlers/query-handlers/get-settings.handler";
import { SettingsController } from "./client/controllers/settings.controller";
import { CurrentSettingsService } from "./domain/services/current-settings.service";
import { Settings } from "./infrastructure/entities/settings.entity";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Settings])],
  controllers: [SettingsController],
  providers: [
    CurrentSettingsService,
    GetSettingsHandler,
    UpdateSettingsHandler,
  ],
})
export class SettingsModule {}
