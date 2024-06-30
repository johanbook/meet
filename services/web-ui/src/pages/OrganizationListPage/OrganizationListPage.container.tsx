import { ReactElement } from "react";
import { useNavigate } from "react-router";

import { ListItemButton, ListItemText } from "@mui/material";

import { OrganizationDetails, SwitchOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { getDate } from "src/utils/time";
import { ErrorView } from "src/views/ErrorView";

import { OrganizationListPageNav } from "./OrganizationListPage.nav";
import { OrganizationListPageSkeleton } from "./OrganizationListPage.skeleton";

export function OrganizationListPageContainer(): ReactElement {
  const { t } = useTranslation("organization-list");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeysConstants.OrganizationList],
    queryFn: () => organizationsApi.getOrganizations(),
  });

  const mutation = useMutation({
    mutationFn: (switchOrganizationCommand: SwitchOrganizationCommand) =>
      organizationsApi.switchOrganization({ switchOrganizationCommand }),
  });

  if (error) {
    return (
      <OrganizationListPageNav>
        <ErrorView error={error} />
      </OrganizationListPageNav>
    );
  }

  if (isPending) {
    return (
      <OrganizationListPageNav>
        <OrganizationListPageSkeleton />
      </OrganizationListPageNav>
    );
  }

  if (!data || data.length === 0) {
    return (
      <OrganizationListPageNav>
        <ErrorView error={t("organization-list.error")} />
      </OrganizationListPageNav>
    );
  }

  async function handleClick(organization: OrganizationDetails): Promise<void> {
    await mutation.mutateAsync(
      { organizationId: organization.id },
      {
        onError: () => snackbar.error(t("actions.activate.error")),
        onSuccess: () => {
          queryClient.resetQueries();
          navigate("/");
          snackbar.success(t("actions.activate.success"));
        },
      }
    );
  }

  return (
    <OrganizationListPageNav>
      {data.map((organization) => (
        <ListItemButton
          key={organization.id}
          onClick={() => handleClick(organization)}
        >
          <ListItemText
            primary={organization.name}
            secondary={getDate(organization.created)}
          />
        </ListItemButton>
      ))}
    </OrganizationListPageNav>
  );
}
