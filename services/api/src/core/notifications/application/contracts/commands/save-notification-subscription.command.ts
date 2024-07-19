import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";

import { NotificationSubscriptionKeysDetails } from "../dtos/notification-subscription-keys.dto";

export class SaveNotificationSubscriptionCommand {
  @IsUrl()
  @IsString()
  endpoint?: string;

  @IsOptional()
  @IsNumber()
  expirationTime?: number | null;

  @ValidateNested()
  keys?: NotificationSubscriptionKeysDetails;
}
