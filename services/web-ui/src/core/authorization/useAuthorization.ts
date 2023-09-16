import { OrganizationMemberDetailsRoleEnum } from "src/api";
import { organizationsApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";

interface UseAuthorizationResult {
  role?: OrganizationMemberDetailsRoleEnum;
}

export function useAuthorization(): UseAuthorizationResult {
  const { data } = useQuery(CacheKeysConstants.CurrentOrganization, () =>
    organizationsApi.getCurrentOrganization()
  );

  if (!data) {
    return {};
  }

  return { role: data.role };
}
