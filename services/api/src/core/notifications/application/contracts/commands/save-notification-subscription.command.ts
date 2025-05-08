import { Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";

import { NoJournal } from "src/core/journal";

import { NotificationSubscriptionKeysDetails } from "../dtos/notification-subscription-keys.dto";

@NoJournal()
export class SaveNotificationSubscriptionCommand {
  @IsUrl()
  @IsString()
  endpoint?: string;

  @IsOptional()
  @IsNumber()
  expirationTime?: number | null;

  @ValidateNested()
  @Type(() => NotificationSubscriptionKeysDetails)
  keys?: NotificationSubscriptionKeysDetails;
}
