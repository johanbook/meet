import { ReactElement, useState } from "react";
import { useNavigate } from "react-router";

import { ErrorOutline } from "@mui/icons-material";
import {
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
import { OrganizationAvatar } from "src/components/shared";
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

const SIZE = 36;

interface MenuContentProps {
  currentOrganizationId: number;
}

function MenuContent({ currentOrganizationId }: MenuContentProps) {
  const query = useQuery({
    queryKey: [CacheKeysConstants.OrganizationList],
    queryFn: () => organizationsApi.getOrganizations(),
  });

  const queryClient = useQueryClient();

  const { t } = useTranslation("organization.list");

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

  if (filteredOrganizations.length === 0) {
    return <Typography sx={{ p: 2 }}>{t("no-other-groups")}</Typography>;
  }

  return (
    <>
      {filteredOrganizations.map((organization) => (
        <MenuItem
          sx={{ maxWidth: "65vw" }}
          key={organization.id}
          onClick={() => handleClick(organization)}
          selected={organization.id === currentOrganizationId}
        >
          <OrganizationAvatar
            name={organization.name}
            size={SIZE}
            src={organization.photo?.url}
          />
          <Typography
            sx={{
              ml: 2,
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
    return <Skeleton height={SIZE} width={SIZE} variant="rectangular" />;
  }

  if (query.error) {
    return <ErrorOutline color="error" sx={{ height: SIZE, width: SIZE }} />;
  }

  if (isMobile) {
    return (
      <>
        <ButtonBase onClick={() => setIsDrawerOpen(true)}>
          <OrganizationAvatar
            name={query.data.name}
            src={query.data.photo?.url}
            size={SIZE}
          />
        </ButtonBase>

        <Drawer
          elevation={4}
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
            <OrganizationAvatar
              name={query.data.name}
              src={query.data.photo?.url}
              size={SIZE}
            />
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
      Button={({ onClick }) => (
        <IconButton onClick={onClick}>
          <OrganizationAvatar
            name={query.data.name}
            src={query.data.photo?.url}
            size={SIZE}
          />
        </IconButton>
      )}
    >
      <MenuContent currentOrganizationId={query.data.id} />
    </Menu>
  );
}
