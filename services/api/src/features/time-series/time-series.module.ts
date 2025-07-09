import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthorizationModule } from "src/core/authorization/authorization.module";
import { OrganizationModule } from "src/core/organizations/organization.module";
import { ProfileModule } from "src/core/profiles/profile.module";
import { QueryModule } from "src/core/query/query.module";

import { AddPointToTimeSeriesHandler } from "./application/handlers/command-handlers/add-point-to-time-series.handler";
import { CreateTimeSeriesHandler } from "./application/handlers/command-handlers/create-time-series.handler";
import { DeleteTimeSeriesPointHandler } from "./application/handlers/command-handlers/delete-time-series-point.handler";
import { DeleteTimeSeriesHandler } from "./application/handlers/command-handlers/delete-time-series.handler";
import { UpdateTimeSeriesPointHandler } from "./application/handlers/command-handlers/update-time-series-point.handler";
import { UpdateTimeSeriesHandler } from "./application/handlers/command-handlers/update-time-series.handler";
import { NotifyOrganizationOnTimeSeriesPointCreatedHandler } from "./application/handlers/event-handlers/notify-organization-on-time-series-point-created.handler";
import { GetTimeSeriesListHandler } from "./application/handlers/queries/get-time-series-list.handler";
import { GetTimeSeriesHandler } from "./application/handlers/queries/get-time-series.handler";
import { TimeSeriesController } from "./client/controllers/time-series.controller";
import { TimeSeriesService } from "./domain/services/time-series.service";
import { TimeSeriesPoint } from "./infrastructure/entities/time-series-point.entity";
import { TimeSeries } from "./infrastructure/entities/time-series.entity";

@Module({
  imports: [
    AuthorizationModule,
    CqrsModule,
    OrganizationModule,
    ProfileModule,
    QueryModule,
    TypeOrmModule.forFeature([TimeSeries, TimeSeriesPoint]),
  ],
  controllers: [TimeSeriesController],
  providers: [
    AddPointToTimeSeriesHandler,
    CreateTimeSeriesHandler,
    DeleteTimeSeriesHandler,
    DeleteTimeSeriesPointHandler,
    GetTimeSeriesHandler,
    GetTimeSeriesListHandler,
    NotifyOrganizationOnTimeSeriesPointCreatedHandler,
    TimeSeriesService,
    UpdateTimeSeriesPointHandler,
    UpdateTimeSeriesHandler,
  ],
  exports: [TimeSeriesService],
})
export class TimeSeriesModule {}
