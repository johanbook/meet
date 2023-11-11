import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { Profile } from "src/core/profiles";
import { ProfileModule } from "src/core/profiles/profile.module";

import { CreateSettingsIfMissingHandler } from "./application/handlers/command-handlers/create-settings-if-missing.handler";
import { CreateSettingsHandler } from "./application/handlers/command-handlers/create-settings.handler";
import { UpdateSettingsHandler } from "./application/handlers/command-handlers/update-settings.handler";
import { CreateSettingsOnProfileCreatedHandler } from "./application/handlers/event-handlers/create-settings-on-profile-created.handler";
import { GetSettingsHandler } from "./application/handlers/query-handlers/get-settings.handler";
import { SettingsController } from "./client/controllers/settings.controller";
import { SettingsJobs } from "./client/jobs/settings.jobs";
import { CurrentSettingsService } from "./domain/services/current-settings.service";
import { Settings } from "./infrastructure/entities/settings.entity";

@Module({
  imports: [
    AuthenticationModule,
    CqrsModule,
    ProfileModule,
    TypeOrmModule.forFeature([Profile, Settings]),
  ],
  controllers: [SettingsController],
  providers: [
    CreateSettingsHandler,
    CreateSettingsIfMissingHandler,
    CreateSettingsOnProfileCreatedHandler,
    CurrentSettingsService,
    GetSettingsHandler,
    SettingsJobs,
    UpdateSettingsHandler,
  ],
})
export class SettingsModule {}
