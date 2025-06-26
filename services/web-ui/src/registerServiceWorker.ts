import { notificationsApi } from "./apis";
import { Logger } from "./core/logging";

const SERVICE_WORKER_PATH = "service-worker.js";

const logger = new Logger(registerServiceWorker.name);

export async function registerServiceWorker() {
  const registration =
    await navigator.serviceWorker.register(SERVICE_WORKER_PATH);

  try {
    const subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      return;
    }

    const saveNotificationSubscriptionCommand = subscription.toJSON();

    await notificationsApi.saveSubscription({
      // @ts-expect-error // TODO: Fix this type
      saveNotificationSubscriptionCommand,
    });
  } catch (error) {
    logger.captureException(error);
  }
}
