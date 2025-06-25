import { ReactElement } from "react";
import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useTranslation } from "src/core/i18n";

import { NavItem } from "./types";

export interface NavLinkListItemProps {
  item: NavItem;
}

export function NavLinkListItem({ item }: NavLinkListItemProps): ReactElement {
  const location = useLocation();
  const isActive = item.checkIfActive(location.pathname);

  const { t } = useTranslation("core");

  return (
    <ListItem disablePadding sx={{ px: 1, pb: 1 }}>
      <ListItemButton
        component={RouterLink}
        to={item.url}
        selected={isActive}
        sx={{ borderRadius: 2 }}
      >
        <ListItemIcon>
          <item.Icon color={isActive ? "secondary" : undefined} />
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
