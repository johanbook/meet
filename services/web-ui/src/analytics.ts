import { AnalyticsBrowser } from "@segment/analytics-next";

export const analytics = AnalyticsBrowser.load({
  writeKey: import.meta.env.VITE_ANALYTICS_KEY,
});
