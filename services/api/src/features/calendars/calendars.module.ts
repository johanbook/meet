import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrganizationModule } from "src/core/organizations/organization.module";

import { GetCalendarEventListQueryHandler } from "./application/handlers/query-handlers/get-calendar-event-list.handler";
import { CalendarsController } from "./client/controllers/calendars.controller";
import { CalendarEvent } from "./infrastructure/entities/calendar-event.entity";

@Module({
  imports: [
    CqrsModule,
    OrganizationModule,
    TypeOrmModule.forFeature([CalendarEvent]),
  ],
  providers: [GetCalendarEventListQueryHandler],
  controllers: [CalendarsController],
  exports: [],
})
export class CalendarsModule {}
