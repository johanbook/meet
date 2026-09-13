import { notificationsApi } from "src/apis";
import { NotificationDetails } from "src/api";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { groupBy } from "src/utils";

export interface NotificationsResult {
  data: Record<string, NotificationDetails[]> | undefined;
  error: unknown;
  isLoading: boolean;
}

export function useNotifications(): NotificationsResult {
  const query = useQuery({
    queryKey: [CacheKeyEnum.Notifications],
    queryFn: () => notificationsApi.getNotifactions(),
  });

  const grouped = query.data
    ? groupBy(query.data, (item) => item.type)
    : undefined;

  return {
    data: grouped,
    error: query.error,
    isLoading: query.isLoading,
  };
}
