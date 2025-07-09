import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";

import { TimeSeriesPoint } from "../../infrastructure/entities/time-series-point.entity";
import { TimeSeries } from "../../infrastructure/entities/time-series.entity";
import { TimeSeriesCreatedEvent } from "../events/time-series-created.event";
import { TimeSeriesPointCreatedEvent } from "../events/time-series-point-created.event";

@Injectable()
export class TimeSeriesService {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(TimeSeries)
    private readonly timeSeries: Repository<TimeSeries>,
  ) {}

  async createTimeSeries(timeSeries: TimeSeries): Promise<void> {
    const newTimeSeries = await this.timeSeries.save(timeSeries);

    const event = map(TimeSeriesCreatedEvent, {
      id: newTimeSeries.id,
      name: newTimeSeries.name,
      description: newTimeSeries.description,
      profileId: newTimeSeries.profileId,
      organizationId: newTimeSeries.organizationId,
    });

    this.eventBus.publish(event);
  }

  async updateTimeSeries(timeSeries: TimeSeries): Promise<void> {
    await this.timeSeries.save(timeSeries);
  }

  async deleteTimeSeries(timeSeries: TimeSeries): Promise<void> {
    await this.timeSeries.remove(timeSeries);
  }

  async addPointToTimeSeries(
    timeSeriesPoint: TimeSeriesPoint,
    timeSeries: TimeSeries,
  ): Promise<void> {
    timeSeries.points.push(timeSeriesPoint);

    await this.timeSeries.save(timeSeries);

    const event = map(TimeSeriesPointCreatedEvent, {
      description: timeSeriesPoint.description,
      organizationId: timeSeries.organizationId,
      profileId: timeSeriesPoint.profileId,
      timeSeriesId: timeSeries.id,
      value: timeSeriesPoint.value,
    });

    this.eventBus.publish(event);
  }
}
