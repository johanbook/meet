import { IsString } from "class-validator";

export class NotificationSubscriptionKeysDetails {
  @IsString()
  auth!: string;

  @IsString()
  p256dh!: string;
}
