import { addEventListener } from "src/core/events";
import {
  NotificationEvent,
  NotificationEventEnum,
} from "src/core/notifications";
import { CacheKeyEnum } from "src/core/query";
import { QUERY_CLIENT } from "src/queryQlient";

let registered = false;

/**
 * Registers the blog feature's module-level runtime wiring (realtime
 * invalidation). Called once from the feed screen at module scope; the guard
 * keeps hot-reloads and duplicate mounts from stacking listeners.
 */
export function registerBlogFeature(): void {
  if (registered) {
    return;
  }

  registered = true;

  addEventListener(NotificationEvent, (event) => {
    if (event.notification.type === NotificationEventEnum.NewBlogPost) {
      void QUERY_CLIENT.invalidateQueries({
        queryKey: [CacheKeyEnum.BlogPosts],
      });
    }
  });
}