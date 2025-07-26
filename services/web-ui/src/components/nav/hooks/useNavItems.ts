import { useMemo } from "react";

import { organizationsApi } from "src/apis";
import { OrganizationFeature } from "src/core/organizations";
import { CacheKeyEnum, useQuery } from "src/core/query";

import { desktopNav, mobileNav } from "../nav.items";
import { DesktopNav, MobileNav, NavItem } from "../types";

const filterByFeature = (items: NavItem[], features: OrganizationFeature[]) => {
  return items.filter((item) =>
    item.requiredFeatures.every((requiredFeature) =>
      features.includes(requiredFeature),
    ),
  );
};

export const useDesktopNavItems = (): DesktopNav => {
  const { data } = useQuery({
    queryKey: [CacheKeyEnum.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  return useMemo(() => {
    const features = data?.features || [];
    return {
      bottom: filterByFeature(desktopNav.bottom, features),
      top: filterByFeature(desktopNav.top, features),
    };
  }, [data?.features]);
};

export const useMobileNavItems = (): MobileNav => {
  const { data } = useQuery({
    queryKey: [CacheKeyEnum.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  return useMemo(() => {
    const features = data?.features || [];
    return {
      bottom: filterByFeature(mobileNav.bottom, features),
    };
  }, [data?.features]);
};
