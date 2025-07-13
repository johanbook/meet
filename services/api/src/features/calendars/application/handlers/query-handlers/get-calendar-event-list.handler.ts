import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";

import { CalendarEvent } from "../../../infrastructure/entities/calendar-event.entity";
import { CalendarEventDetails } from "../../contracts/dtos/calendar-event.dto";
import { GetCalendarEventListQuery } from "../../contracts/queries/get-calendar-event-list.query";

@QueryHandler(GetCalendarEventListQuery)
export class GetCalendarEventListQueryHandler
  implements IQueryHandler<GetCalendarEventListQuery, CalendarEventDetails[]>
{
  constructor(
    @InjectRepository(CalendarEvent)
    private readonly calendarEventRepository: Repository<CalendarEvent>,
    private readonly currentOrganizationService: CurrentOrganizationService,
  ) {}

  async execute(): Promise<CalendarEventDetails[]> {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const events = await this.calendarEventRepository.find({
      where: {
        organizationId: currentOrganizationId,
      },
    });

    return mapArray(CalendarEventDetails, events, (event) => ({
      id: event.id,
      description: event.description,
      endTime: event.endTime,
      name: event.name,
      profileId: event.profileId,
      startTime: event.startTime,
    }));
  }
}
