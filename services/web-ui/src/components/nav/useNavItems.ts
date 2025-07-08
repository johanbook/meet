import { useMemo } from "react";

import { organizationsApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { mobileNav } from "./nav.items";
import { MobileNav } from "./types";

export const useMobileNavItems = (): MobileNav => {
  const { data } = useQuery({
    queryKey: [CacheKeysConstants.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  return useMemo(() => {
    const features = data?.features || [];
    return {
      bottom: mobileNav.bottom.filter((item) =>
        item.requiredFeatures.every((requiredFeature) =>
          features.includes(requiredFeature),
        ),
      ),
    };
  }, [data?.features]);
};
