import { Injectable } from "@nestjs/common";

const SUBSCRIPTIONS: Record<number, unknown> = {};

@Injectable()
export class NotificationSubscriptionService {
  getSubscription(profileId: number): unknown {
    return SUBSCRIPTIONS[profileId];
  }
  saveSubscription(profileId: number, subscription: unknown) {
    SUBSCRIPTIONS[profileId] = subscription;
  }
}
