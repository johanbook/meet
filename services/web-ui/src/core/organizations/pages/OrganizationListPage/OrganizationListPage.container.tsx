import { ReactElement } from "react";
import { useNavigate } from "react-router";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { OrganizationDetails, SwitchOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { OrganizationAvatar } from "src/components/shared";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { getDate } from "src/utils/time";
import { ErrorView } from "src/views/ErrorView";

import { OrganizationListPageNav } from "./OrganizationListPage.nav";
import { OrganizationListPageSkeleton } from "./OrganizationListPage.skeleton";

export function OrganizationListPageContainer(): ReactElement {
  const { t } = useTranslation("organization.list");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeyEnum.OrganizationList],
    queryFn: () => organizationsApi.getOrganizations(),
  });

  const mutation = useMutation({
    mutationFn: (switchOrganizationCommand: SwitchOrganizationCommand) =>
      organizationsApi.switchOrganization({ switchOrganizationCommand }),
  });

  if (error) {
    return (
      <OrganizationListPageNav>
        <ErrorView />
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
        <ErrorView />
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
      },
    );
  }

  return (
    <OrganizationListPageNav>
      {data.map((organization) => (
        <ListItemButton
          key={organization.id}
          onClick={() => handleClick(organization)}
        >
          <ListItemIcon>
            <OrganizationAvatar
              name={organization.name}
              src={organization.photo?.url}
            />
          </ListItemIcon>
          <ListItemText
            primary={organization.name}
            secondary={getDate(organization.created)}
          />
        </ListItemButton>
      ))}
    </OrganizationListPageNav>
  );
}
