import { notificationsApi } from "./apis";

const SERVICE_WORKER_PATH = "service-worker.js";

export async function registerServiceWorker() {
  const registration =
    await navigator.serviceWorker.register(SERVICE_WORKER_PATH);

  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    return;
  }

  const saveNotificationSubscriptionCommand = subscription.toJSON();

  await notificationsApi.saveSubscription({
    // @ts-expect-error // TODO: Fix this type
    saveNotificationSubscriptionCommand,
  });
}
