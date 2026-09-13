import { organizationsApi } from "src/apis";
import { CurrentOrganizationDetailsRoleEnum as Role } from "src/api";
import { CacheKeyEnum, useQuery } from "src/core/query";

interface UseAuthorizationResult {
  error: Error | undefined;
  hasPermission: ((roles: Role[]) => boolean) | undefined;
  isLoading: boolean;
  role: Role | undefined;
}

function toError(error: Error | null): Error | undefined {
  return error ?? undefined;
}

export function useAuthorization(): UseAuthorizationResult {
  const query = useQuery({
    queryKey: [CacheKeyEnum.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  const role = query.data?.role;

  function hasPermission(roles: Role[]): boolean {
    return role !== undefined && roles.includes(role);
  }

  return {
    error: toError(query.error),
    hasPermission: query.data ? hasPermission : undefined,
    isLoading: query.isLoading,
    role,
  };
}
