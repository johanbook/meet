import * as React from "react";

import { Delete, MoreVert } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useTranslation } from "src/core/i18n";

export function BlogPostMenu() {
  const { t } = useTranslation("blog");

  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>();
  const open = Boolean(anchorEl);

  function handleClick(event: React.SyntheticEvent) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    /* eslint-disable-next-line unicorn/no-useless-undefined */
    setAnchorEl(undefined);
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          {t("menu.delete")}
        </MenuItem>
      </Menu>
    </>
  );
}
