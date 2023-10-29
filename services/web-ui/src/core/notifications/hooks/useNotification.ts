import { UseQueryResult, useQuery } from "react-query";

import { NotificationDetails } from "src/api";
import { notificationsApi } from "src/apis";
import { CacheKeysConstants } from "src/core/query";
import { groupBy } from "src/utils/object";

export function useNotification(): UseQueryResult<
  Record<string, NotificationDetails[]>
> {
  return useQuery([CacheKeysConstants.Notifications], async () => {
    const result = await notificationsApi.getNotifactions();
    return groupBy(result, (item) => item.type);
  });
}
