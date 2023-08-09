import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/core/authentication/authentication.module";

import { CreateSettingsHandler } from "./application/handlers/command-handlers/create-settings.handler";
import { UpdateSettingsHandler } from "./application/handlers/command-handlers/update-settings.handler";
import { CreateSettingsOnProfileCreatedHandler } from "./application/handlers/event-handlers/create-settings-on-profile-created.handler";
import { GetSettingsHandler } from "./application/handlers/query-handlers/get-settings.handler";
import { SettingsController } from "./client/controllers/settings.controller";
import { CurrentSettingsService } from "./domain/services/current-settings.service";
import { Settings } from "./infrastructure/entities/settings.entity";

@Module({
  imports: [
    AuthenticationModule,
    CqrsModule,
    TypeOrmModule.forFeature([Settings]),
  ],
  controllers: [SettingsController],
  providers: [
    CreateSettingsHandler,
    CreateSettingsOnProfileCreatedHandler,
    CurrentSettingsService,
    GetSettingsHandler,
    UpdateSettingsHandler,
  ],
})
export class SettingsModule {}
