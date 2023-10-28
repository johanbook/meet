import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { QueryService } from "src/core/query";
import { CurrentOrganizationService } from "src/features/organizations";
import { CurrentProfileService } from "src/features/profiles";

import { Notification } from "../../../infrastructure/entities/notification.entity";
import { NotificationDetails } from "../../contracts/dtos/notification.dto";
import { GetNotificationListQuery } from "../../contracts/queries/get-notification-list.query";

@QueryHandler(GetNotificationListQuery)
export class GetNotificationListHandler
  implements IQueryHandler<GetNotificationListQuery, NotificationDetails[]>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(Notification)
    private readonly notifications: Repository<Notification>,
    private readonly queryService: QueryService<Notification>,
  ) {}

  async execute(query: GetNotificationListQuery) {
    const organizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();
    const profileId = await this.currentProfileService.fetchCurrentProfileId();

    const fountNotifications = await this.queryService.find(
      this.notifications,
      {
        required: {
          where: {
            organizationId,
            profileId,
          },
        },
        query,
      },
    );

    return mapArray(
      NotificationDetails,
      fountNotifications,
      (notification) => ({
        id: notification.id,
        resourcePath: notification.resourcePath,
      }),
    );
  }
}
