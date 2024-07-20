import { Injectable } from "@nestjs/common";
import { PushSubscription } from "web-push";

const SUBSCRIPTIONS: Record<number, PushSubscription> = {};

@Injectable()
export class NotificationSubscriptionService {
  getSubscription(profileId: number): PushSubscription | undefined {
    return SUBSCRIPTIONS[profileId];
  }

  saveSubscription(profileId: number, subscription: PushSubscription) {
    SUBSCRIPTIONS[profileId] = subscription;
  }
}
