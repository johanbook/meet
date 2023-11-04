import { addEventListener } from "src/core/events";
import { NotificationEvent } from "src/core/notifications/notification.event";
import { CacheKeysConstants } from "src/core/query";
import { QUERY_CLIENT } from "src/queryQlient";

addEventListener(NotificationEvent, (event) => {
  if (event.notification.type === "new_blog_post") {
    QUERY_CLIENT.invalidateQueries([CacheKeysConstants.BlogPosts]);
  }
});
