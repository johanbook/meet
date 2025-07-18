import { ReactElement } from "react";
import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router";

import { ErrorOutline } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";

import { profileApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { NavItem } from "../../types";

const AVATAR_SIZE = 40;

export interface NavProfileProps {
  item: NavItem;
}

const ProfileIcon = () => {
  const query = useQuery({
    queryKey: [CacheKeysConstants.CurrentProfile],
    queryFn: () => profileApi.getCurrentProfile(),
  });

  if (query.isPending) {
    return (
      <Skeleton height={AVATAR_SIZE} width={AVATAR_SIZE} variant="circular" />
    );
  }

  if (query.error) {
    return (
      <ErrorOutline
        color="error"
        sx={{ height: AVATAR_SIZE, width: AVATAR_SIZE }}
      />
    );
  }

  const src = query.data.photo?.url;

  if (!src) {
    return (
      <Avatar sx={{ height: AVATAR_SIZE, width: AVATAR_SIZE }}>
        {query.data.name}
      </Avatar>
    );
  }

  return (
    <Avatar
      src={query.data?.photo?.url}
      sx={{ height: AVATAR_SIZE, width: AVATAR_SIZE }}
    />
  );
};

export function NavProfile({ item }: NavProfileProps): ReactElement {
  const location = useLocation();
  const isActive = item.checkIfActive(location.pathname);

  const { t } = useTranslation("core");

  return (
    <ListItem disablePadding sx={{ px: 1 }}>
      <ListItemButton component={RouterLink} to={item.url} selected={isActive}>
        <ListItemIcon>
          <ProfileIcon />
        </ListItemIcon>

        <ListItemText
          primary={t(item.name)}
          slotProps={{
            primary: {
              sx: {
                fontWeight: isActive ? 600 : 400,
              },
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
