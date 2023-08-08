import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinioModule } from "nestjs-minio-client";

import { AuthenticationModule } from "./core/authentication/authentication.module";
import { ClassificationsModule } from "./core/classifications/classifications.module";
import { ErrorHandlingModule } from "./core/error-handling/error-handling.module";
import { HealthChecksModule } from "./core/health-checks/health-checks.module";
import { JournalModule } from "./core/journal/journal.module";
import { LoggingModule } from "./core/logging/logging.module";
import { NotificationModule } from "./core/notifications/notification.module";
import { minioOptions } from "./core/object-storage/minio.config";
import { RequestContextModule } from "./core/request-context/request-context.module";
import { ChatModule } from "./features/chat/chat.module";
import { MatchesModule } from "./features/matches/matches.module";
import { OrganizationModule } from "./features/organizations/organization.module";
import { PhotosModule } from "./features/photos/photos.module";
import { ProfileModule } from "./features/profiles/profile.module";
import { SettingsModule } from "./features/settings/settings.module";
import { WingmanModule } from "./features/wingman/wingman.module";
import { dataSourceOptions } from "./infrastructure/database/data-source.config";

@Module({
  imports: [
    AuthenticationModule,
    ChatModule,
    ClassificationsModule,
    ErrorHandlingModule,
    HealthChecksModule,
    JournalModule,
    LoggingModule,
    MatchesModule,
    NotificationModule,
    ScheduleModule.forRoot(),
    RequestContextModule,
    MinioModule.register({ ...minioOptions, isGlobal: true }),
    OrganizationModule,
    PhotosModule,
    ProfileModule,
    SettingsModule,
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    WingmanModule,
  ],
  providers: [],
})
export class AppModule {}
