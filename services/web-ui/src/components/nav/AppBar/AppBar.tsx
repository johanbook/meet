import { ReactElement } from "react";

import { ErrorOutline, KeyboardArrowDown } from "@mui/icons-material";
import {
  ButtonBase,
  CircularProgress,
  MenuItem,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";

import { OrganizationDetails, SwitchOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { Menu } from "src/components/ui/Menu";
import { config } from "src/config";
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

function AppBarContent(): ReactElement {
  const query = useQuery({
    queryKey: [CacheKeysConstants.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  if (query.isPending) {
    return (
      <Typography color="primary" variant="h6">
        {config.APP.NAME} <CircularProgress />
      </Typography>
    );
  }

  if (query.error) {
    return (
      <Typography color="primary" variant="h6">
        {config.APP.NAME} <ErrorOutline />
      </Typography>
    );
  }

  return (
    <Menu
      Button={(props) => (
        <ButtonBase>
          <Typography
            color="primary"
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
            {...props}
          >
            {config.APP.NAME} {query.data.name}
            <KeyboardArrowDown />
          </Typography>
        </ButtonBase>
      )}
    >
      <MenuContent currentOrganizationId={query.data.id} />
    </Menu>
  );
}

export function AppBar(): ReactElement {
  return (
    <MuiAppBar
      color="inherit"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <AppBarContent />
      </Toolbar>
    </MuiAppBar>
  );
}
