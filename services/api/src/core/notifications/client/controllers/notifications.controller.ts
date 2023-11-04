import {
  Controller,
  Get,
  NotImplementedException,
  Query,
} from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { NotificationDetails } from "../../application/contracts/dtos/notification.dto";
import { GetNotificationListQuery } from "../../application/contracts/queries/get-notification-list.query";

@Controller("notifications")
@ApiTags("notifications")
export class NotificationsController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getNotifactions(
    @Query() query: GetNotificationListQuery,
  ): Promise<NotificationDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Get("meta")
  async getMeta(): Promise<string> {
    throw new NotImplementedException();
  }
}
