const SERVICE_WORKER_PATH = "service-worker.js";

export async function registerServiceWorker() {
  const registration = await navigator.serviceWorker.register(
    SERVICE_WORKER_PATH
  );

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    await Notification.requestPermission();

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: "asad",
    });
  }

  const body = subscription.toJSON();

  await fetch("/subscription", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
