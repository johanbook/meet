import { OrganizationMemberDetailsRoleEnum as Role } from "src/api";
import { organizationsApi } from "src/apis";
import { CacheKeyEnum, useQuery } from "src/core/query";

type UseAuthorizationResult =
  | {
      error: undefined;
      isLoading: true;
      hasPermission: undefined;
      role: undefined;
    }
  | {
      error: undefined;
      isLoading: false;
      hasPermission: (roles: Role[]) => boolean;
      role: Role;
    }
  | {
      error: Error;
      isLoading: false;
      hasPermission: undefined;
      role: undefined;
    };

export function useAuthorization(): UseAuthorizationResult {
  const { data, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  if (isLoading) {
    return {
      error: undefined,
      isLoading: true,
      hasPermission: undefined,
      role: undefined,
    };
  }

  if (!data) {
    return {
      error: new Error("Unable to get data"),
      isLoading: false,
      hasPermission: undefined,
      role: undefined,
    };
  }

  const currentRole = data.role;

  function hasPermission(roles: Role[]): boolean {
    return roles.includes(currentRole);
  }

  return {
    error: undefined,
    isLoading: false,
    hasPermission,
    role: currentRole,
  };
}
