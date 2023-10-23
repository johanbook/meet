import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinioModule } from "nestjs-minio-client";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { RolesGuard } from "src/core/authorization";
import { ClassificationsModule } from "src/core/classifications/classifications.module";
import { ErrorHandlingModule } from "src/core/error-handling/error-handling.module";
import { HealthChecksModule } from "src/core/health-checks/health-checks.module";
import { JournalModule } from "src/core/journal/journal.module";
import { LoggingModule } from "src/core/logging/logging.module";
import { NotificationModule } from "src/core/notifications/notification.module";
import { minioOptions } from "src/core/object-storage/minio.config";
import { RequestContextModule } from "src/core/request-context/request-context.module";
import { BlogsModule } from "src/features/blogs/blogs.module";
import { ChatModule } from "src/features/chat/chat.module";
import { OrganizationModule } from "src/features/organizations/organization.module";
import { ProfileModule } from "src/features/profiles/profile.module";
import { SettingsModule } from "src/features/settings/settings.module";
import { dataSourceOptions } from "src/infrastructure/database/data-source.config";

@Module({
  imports: [
    AuthenticationModule,
    BlogsModule,
    ChatModule,
    ClassificationsModule,
    ErrorHandlingModule,
    HealthChecksModule,
    JournalModule,
    LoggingModule,
    NotificationModule,
    ScheduleModule.forRoot(),
    RequestContextModule,
    MinioModule.register({ ...minioOptions, isGlobal: true }),
    OrganizationModule,
    ProfileModule,
    SettingsModule,
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
