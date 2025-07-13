import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CalendarEventDetails } from "../../application/contracts/dtos/calendar-event.dto";
import { GetCalendarEventListQuery } from "../../application/contracts/queries/get-calendar-event-list.query";

@Controller("calendars")
@ApiTags("calendars")
export class CalendarsController {
  constructor(private queryBus: QueryBus) {}

  @Get("/events")
  async getCalendarEventList(
    @Query() query: GetCalendarEventListQuery,
  ): Promise<CalendarEventDetails[]> {
    return await this.queryBus.execute(query);
  }
}
