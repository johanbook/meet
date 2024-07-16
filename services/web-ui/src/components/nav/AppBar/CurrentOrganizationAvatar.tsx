import { ReactElement } from "react";

import { ErrorOutline } from "@mui/icons-material";
import {
  Avatar,
  ButtonBase,
  CircularProgress,
  MenuItem,
  Skeleton,
} from "@mui/material";

import { OrganizationDetails, SwitchOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { Menu } from "src/components/ui/Menu";
import { useTranslation } from "src/core/i18n";
import {
  CacheKeysConstants,
  useMutation,
  useQuery,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface MenuContentProps {
  currentOrganizationId: number;
}

function MenuContent({ currentOrganizationId }: MenuContentProps) {
  const query = useQuery({
    queryKey: [CacheKeysConstants.OrganizationList],
    queryFn: () => organizationsApi.getOrganizations(),
  });

  const queryClient = useQueryClient();

  const { t } = useTranslation("organization-list");

  const mutation = useMutation({
    mutationFn: (switchOrganizationCommand: SwitchOrganizationCommand) =>
      organizationsApi.switchOrganization({ switchOrganizationCommand }),
  });

  const snackbar = useSnackbar();

  if (query.isPending) {
    return <CircularProgress />;
  }

  if (query.error) {
    return <ErrorMessage error={query.error} />;
  }

  async function handleClick(organization: OrganizationDetails): Promise<void> {
    await mutation.mutateAsync(
      { organizationId: organization.id },
      {
        onError: () => snackbar.error(t("actions.activate.error")),
        onSuccess: () => {
          queryClient.resetQueries();
          snackbar.success(t("actions.activate.success"));
        },
      }
    );
  }

  return (
    <>
      {query.data.map((organization) => (
        <MenuItem
          key={organization.id}
          onClick={() => handleClick(organization)}
          selected={organization.id === currentOrganizationId}
        >
          {organization.name}
        </MenuItem>
      ))}
    </>
  );
}

export function CurrentOrganizationAvatar(): ReactElement {
  const query = useQuery({
    queryKey: [CacheKeysConstants.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  if (query.isPending) {
    return <Skeleton height={30} width={30} variant="circular" />;
  }

  if (query.error) {
    return <ErrorOutline color="error" sx={{ height: 30, width: 30 }} />;
  }

  return (
    <Menu
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      Button={(props) => (
        <ButtonBase>
          <Avatar sx={{ height: 30, width: 30 }} {...props}>
            {query.data.name[0]}
          </Avatar>
        </ButtonBase>
      )}
    >
      <MenuContent currentOrganizationId={query.data.id} />
    </Menu>
  );
}
