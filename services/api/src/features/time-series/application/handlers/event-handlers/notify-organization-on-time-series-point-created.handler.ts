import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityNotFoundError } from "src/core/error-handling";
import {
  NotificationEventEnum,
  NotificationService,
} from "src/core/notifications";
import { INotification } from "src/core/notifications/types";
import { Profile } from "src/core/profiles";

import { TimeSeriesPointCreatedEvent } from "../../../domain/events/time-series-point-created.event";
import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";

@EventsHandler(TimeSeriesPointCreatedEvent)
export class NotifyOrganizationOnTimeSeriesPointCreatedHandler
  implements IEventHandler<TimeSeriesPointCreatedEvent>
{
  constructor(
    private readonly notificationService: NotificationService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    @InjectRepository(TimeSeries)
    private readonly timeSeries: Repository<TimeSeries>,
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
      throw new EntityNotFoundError(Profile);
    }

    const timeSeries = await this.timeSeries.findOne({
      select: {
        name: true,
      },
      where: {
        id: event.timeSeriesId,
      },
    });

    if (!timeSeries) {
      throw new EntityNotFoundError(TimeSeries);
    }

    const notification: INotification = {
      description: `${profile.name} added a new data point to '${timeSeries.name}': ${event.description}`,
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
