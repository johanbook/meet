import { NotFoundException } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  NotificationEventEnum,
  NotificationService,
} from "src/core/notifications";
import { INotification } from "src/core/notifications/types";
import { Profile } from "src/core/profiles";

import { TimeSeriesPointCreatedEvent } from "../../../domain/events/time-series-point-created.event";

@EventsHandler(TimeSeriesPointCreatedEvent)
export class NotifyOrganizationOnTimeSeriesPointCreatedHandler
  implements IEventHandler<TimeSeriesPointCreatedEvent>
{
  constructor(
    private readonly notificationService: NotificationService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async handle(event: TimeSeriesPointCreatedEvent) {
    const profile = await this.profiles.findOne({
      select: {
        name: true,
      },
      where: {
        id: event.profileId,
      },
    });

    if (!profile) {
      throw new NotFoundException("Profile not found");
    }

    const notification: INotification = {
      description: `${profile.name} added a new data point to '${event.timeSeriesId}': ${event.description}`,
      message: `${profile.name} added a new data point`,
      resourcePath: `/time-series/${event.timeSeriesId}`,
      type: NotificationEventEnum.NewTimeSeriesPoint,
    };

    await this.notificationService.notifyOrganization(
      event.organizationId,
      notification,
      [event.profileId],
    );
  }
}
