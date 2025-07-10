import { map } from "src/core/mapper";
import {
  NotificationEventEnum,
  NotificationService,
} from "src/core/notifications";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { TestSuite } from "src/test";

import { TimeSeriesPointCreatedEvent } from "../../../domain/events/time-series-point-created.event";
import { NotifyOrganizationOnTimeSeriesPointCreatedHandler } from "./notify-organization-on-time-series-point-created.handler";

describe(NotifyOrganizationOnTimeSeriesPointCreatedHandler.name, () => {
  let handler: NotifyOrganizationOnTimeSeriesPointCreatedHandler;
  let notificationService: NotificationService;
  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();

    notificationService = {
      notifyOrganization: vi.fn(),
    } as unknown as NotificationService;

    handler = new NotifyOrganizationOnTimeSeriesPointCreatedHandler(
      notificationService,
      testSuite.profiles,
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
        description: `${profile!.name} added a new data point to 'ts-1': my-description`,
        message: `${profile!.name} added a new data point`,
        resourcePath: `/time-series/ts-1`,
        type: NotificationEventEnum.NewTimeSeriesPoint,
      },
      [event.profileId],
    );
  });
});
