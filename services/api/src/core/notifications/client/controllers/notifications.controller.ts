import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Query,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { map } from "src/core/mapper";
import { getRequiredStringConfig } from "src/utils/config.helper";

import { SaveNotificationSubscriptionCommand } from "../../application/contracts/commands/save-notification-subscription.command";
import { NotificationMetaDetails } from "../../application/contracts/dtos/notification-meta.dto";
import { NotificationDetails } from "../../application/contracts/dtos/notification.dto";
import { VapidDetails } from "../../application/contracts/dtos/vapid.dto";
import { GetNotificationListQuery } from "../../application/contracts/queries/get-notification-list.query";

@Controller("notifications")
@ApiTags("notifications")
export class NotificationsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async getNotifactions(
    @Query() query: GetNotificationListQuery,
  ): Promise<NotificationDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Get("meta")
  async getMeta(): Promise<NotificationMetaDetails> {
    throw new NotImplementedException();
  }

  @Post("subscription")
  async saveSubscription(
    @Body() command: SaveNotificationSubscriptionCommand,
  ): Promise<void> {
    return await this.commandBus.execute(command);
  }

  @Get("vapid")
  getVapid(): VapidDetails {
    return map(VapidDetails, {
      key: getRequiredStringConfig("VAPID_PUBLIC_KEY"),
    });
  }
}
