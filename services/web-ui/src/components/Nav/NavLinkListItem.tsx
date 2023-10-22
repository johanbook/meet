import { ReactElement } from "react";
import { useMatch } from "react-router";
import { NavLink } from "react-router-dom";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { NavItem } from "./desktopItems";

export interface NavLinkListItemProps {
  item: NavItem;
}

export function NavLinkListItem({ item }: NavLinkListItemProps): ReactElement {
  const match = useMatch(item.url);

  return (
    <ListItem>
      <ListItemButton
        component={NavLink}
        selected={Boolean(match)}
        to={item.url}
      >
        <ListItemIcon>
          <item.Icon />
        </ListItemIcon>

        <ListItemText
          primary={item.name}
          sx={{
            fontWeight: match ? 600 : 400,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
