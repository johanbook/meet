import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import {
  NotificationEventEnum,
  NotificationService,
} from "src/core/notifications";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { TestSuite } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { TimeSeriesPointCreatedEvent } from "../../../domain/events/time-series-point-created.event";
import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { makeTimeSeries } from "../../../test/factories/time-series.factory";
import { NotifyOrganizationOnTimeSeriesPointCreatedHandler } from "./notify-organization-on-time-series-point-created.handler";

describe(NotifyOrganizationOnTimeSeriesPointCreatedHandler.name, () => {
  let handler: NotifyOrganizationOnTimeSeriesPointCreatedHandler;
  let notificationService: NotificationService;
  let testSuite: TestSuite;
  let timeSeries: Repository<TimeSeries>;

  beforeEach(() => {
    testSuite = new TestSuite();

    timeSeries = createMockRepository<TimeSeries>([makeTimeSeries()]);

    notificationService = {
      notifyOrganization: vi.fn(),
    } as unknown as NotificationService;

    handler = new NotifyOrganizationOnTimeSeriesPointCreatedHandler(
      notificationService,
      testSuite.profiles,
      timeSeries,
    );
  });

  it("should notify the organization when a data point is added", async () => {
    const organization = await testSuite.organizations.findOne({});
    const profile = await testSuite.profiles.findOne({});

    const event = map(TimeSeriesPointCreatedEvent, {
      description: "my-description",
      organizationId: organization!.id,
      profileId: profile!.id,
      timeSeriesId: "ts-1",
      value: 123,
    });

    await handler.handle(event);

    expect(notificationService.notifyOrganization).toHaveBeenCalledWith(
      event.organizationId,
      {
        description: "my-description",
        message: `${profile!.name} added to my-time-series`,
        resourcePath: `/time-series/ts-1`,
        type: NotificationEventEnum.NewTimeSeriesPoint,
      },
      [event.profileId],
    );
  });
});
