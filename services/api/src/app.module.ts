import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinioModule } from "nestjs-minio-client";

import { ClientModule } from "./client/client.module";
import { RequestContextModule } from "./client/context/request-context.module";
import { ClassificationsModule } from "./core/classifications/classifications.module";
import { ErrorHandlingModule } from "./core/error-handling/error-handling.module";
import { HealthChecksModule } from "./core/health-checks/health-checks.module";
import { JournalModule } from "./core/journal/journal.module";
import { NotificationModule } from "./core/notifications/notification.module";
import { minioOptions } from "./core/object-storage/minio.config";
import { ChatModule } from "./features/chat/chat.module";
import { SettingsModule } from "./features/settings/settings.module";
import { WingmanModule } from "./features/wingman/wingman.module";
import { dataSourceOptions } from "./infrastructure/database/data-source.config";

@Module({
  imports: [
    ChatModule,
    ClassificationsModule,
    ErrorHandlingModule,
    JournalModule,
    HealthChecksModule,
    NotificationModule,
    ScheduleModule.forRoot(),
    RequestContextModule,
    MinioModule.register({ ...minioOptions, isGlobal: true }),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    ClientModule,
    SettingsModule,
    WingmanModule,
  ],
  providers: [],
})
export class AppModule {}
