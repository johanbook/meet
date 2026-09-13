import { organizationsApi } from "src/apis";
import { CacheKeyEnum, useQuery } from "src/core/query";

import { NAV_ITEMS, NavItem } from "../nav.items";

interface UseNavItemsResult {
  error: unknown;
  isLoading: boolean;
  navItems: NavItem[];
}

function isFeatureEnabled(
  features: string[] | undefined,
  feature: NavItem["feature"],
): boolean {
  // Without organization data everything is shown; with data, only the
  // features the organization has enabled.
  if (!features) {
    return true;
  }

  if (!feature) {
    return true;
  }

  return features.includes(feature);
}

export function useNavItems(): UseNavItemsResult {
  const query = useQuery({
    queryKey: [CacheKeyEnum.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  const features = query.data?.features;

  const navItems = NAV_ITEMS.filter((item) =>
    isFeatureEnabled(features, item.feature),
  );

  return {
    error: query.error,
    isLoading: query.isLoading,
    navItems,
  };
}