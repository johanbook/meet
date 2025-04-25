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
  const regexp = new RegExp(item.isActive || item.url);
  const match = regexp.test(location.pathname);

  const { t } = useTranslation("core");

  return (
    <ListItem>
      <ListItemButton component={RouterLink} to={item.url}>
        <ListItemIcon>
          <item.Icon color={match ? "secondary" : undefined} />
        </ListItemIcon>

        <ListItemText
          primary={t(item.name)}
          primaryTypographyProps={{
            sx: {
              fontWeight: match ? 600 : 400,
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
