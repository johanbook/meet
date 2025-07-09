import { IEvent } from "@nestjs/cqrs";

export class TimeSeriesPointCreatedEvent implements IEvent {
  public readonly description!: string;

  public readonly organizationId!: number;

  public readonly profileId!: number;

  public readonly timeSeriesId!: string;

  public readonly value!: number;
}
