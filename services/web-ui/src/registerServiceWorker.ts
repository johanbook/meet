import { notificationsApi } from "./apis";

const SERVICE_WORKER_PATH = "service-worker.js";

export async function registerServiceWorker() {
  const registration = await navigator.serviceWorker.register(
    SERVICE_WORKER_PATH
  );

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    await Notification.requestPermission();

    const vapid = await notificationsApi.getVapid();

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapid.key,
    });
  }

  const saveNotificationSubscriptionCommand = subscription.toJSON();

  await notificationsApi.saveSubscription({
    // @ts-expect-error // TODO: Fix this type
    saveNotificationSubscriptionCommand,
  });
}
