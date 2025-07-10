import { NotFoundException } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  NotificationEventEnum,
  NotificationService,
} from "src/core/notifications";
import { INotification } from "src/core/notifications/types";

import { MemberAddedToOrganizationEvent } from "../../../domain/events/member-added-to-organization.event";
import { Organization } from "../../../infrastructure/entities/organization.entity";

@EventsHandler(MemberAddedToOrganizationEvent)
export class NotifyProfileWhenAddedToOrganizationHandler
  implements IEventHandler<MemberAddedToOrganizationEvent>
{
  constructor(
    private readonly notificationService: NotificationService,
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>,
  ) {}

  async handle(event: MemberAddedToOrganizationEvent) {
    const organization = await this.organizations.findOne({
      select: {
        name: true,
      },
      where: {
        id: event.organizationId,
      },
    });

    if (!organization) {
      throw new NotFoundException("Organization not found");
    }

    const notification: INotification = {
      data: {},
      description: `You were added to an organization in Meet`,
      message: `You were added to the organization ${organization.name}`,
      resourcePath: "/",
      type: NotificationEventEnum.AddedToOrganization,
    };

    await this.notificationService.notifyProfiles(
      [event.profileId],
      notification,
    );
  }
}
