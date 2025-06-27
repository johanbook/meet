import { ReactElement, useState } from "react";
import { useNavigate } from "react-router";

import { ErrorOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ButtonBase,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Skeleton,
  Typography,
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
import { useIsMobile } from "src/hooks/useIsMobile";

const SIZE = 30;

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
      },
    );
  }

  const filteredOrganizations = query.data.filter(
    (organization) => organization.id !== currentOrganizationId,
  );

  return (
    <>
      {filteredOrganizations.map((organization) => (
        <MenuItem
          sx={{ maxWidth: "65vw" }}
          key={organization.id}
          onClick={() => handleClick(organization)}
          selected={organization.id === currentOrganizationId}
        >
          <Avatar sx={{ height: SIZE, width: SIZE, mr: 2 }}>
            {organization.name[0]}
          </Avatar>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {organization.name}
          </Typography>
        </MenuItem>
      ))}
    </>
  );
}

export function CurrentOrganizationAvatar(): ReactElement {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [drawerIsOpen, setIsDrawerOpen] = useState(false);

  const query = useQuery({
    queryKey: [CacheKeysConstants.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  if (query.isPending) {
    return <Skeleton height={SIZE} width={SIZE} variant="circular" />;
  }

  if (query.error) {
    return <ErrorOutline color="error" sx={{ height: SIZE, width: SIZE }} />;
  }

  if (isMobile) {
    return (
      <>
        <ButtonBase onClick={() => setIsDrawerOpen(true)}>
          <Avatar sx={{ height: SIZE, width: SIZE }}>
            {query.data.name[0]}
          </Avatar>
        </ButtonBase>

        <Drawer
          onClose={() => setIsDrawerOpen(false)}
          open={drawerIsOpen}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
        >
          <Box
            onClick={() => navigate("/group")}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              p: 2,
              gap: 2,
              width: "65vw",
            }}
          >
            <Avatar sx={{ height: SIZE, width: SIZE }}>
              {query.data.name[0]}
            </Avatar>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              variant="h6"
            >
              {query.data.name}
            </Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <MenuContent currentOrganizationId={query.data.id} />
        </Drawer>
      </>
    );
  }

  return (
    <Menu
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      Button={(props) => (
        <IconButton>
          <Avatar sx={{ height: SIZE, width: SIZE }} {...props}>
            {query.data.name[0]}
          </Avatar>
        </IconButton>
      )}
    >
      <MenuContent currentOrganizationId={query.data.id} />
    </Menu>
  );
}
