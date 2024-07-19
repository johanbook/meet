import { sendNotification, setVapidDetails } from "web-push";

import { getRequiredStringConfig } from "src/utils/config.helper";

export class NotificationWebPushGateway {
  constructor() {
    setVapidDetails(
      getRequiredStringConfig("EMAIL"),
      getRequiredStringConfig("VAPID_PUBLIC_KEY"),
      getRequiredStringConfig("VAPID_PRIVATE_KEY"),
    );
  }

  public sendWebPush(payload = "Example paload") {
    const pushSubscription = {
      endpoint: ".....",
      keys: {
        auth: ".....",
        p256dh: ".....",
      },
    };

    sendNotification(pushSubscription, payload);
  }
}
