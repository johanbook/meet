import { NotificationDetails } from "src/api";
import { notificationsApi } from "src/apis";
import { CacheKeyEnum, UseQueryResult, useQuery } from "src/core/query";
import { groupBy } from "src/utils/object";

export function useNotifications(): UseQueryResult<
  Record<string, NotificationDetails[]>
> {
  return useQuery({
    queryKey: [CacheKeyEnum.Notifications],
    queryFn: async () => {
      const result = await notificationsApi.getNotifactions();
      return groupBy(result, (item) => item.type);
    },
  });
}
