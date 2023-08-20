import * as React from "react";
import { useMutation, useQueryClient } from "react-query";

import { Delete, MoreVert } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { DeleteBlogPostCommand } from "src/api";
import { blogsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface BlogPostMenuProps {
  id: string;
}

export function BlogPostMenu({ id }: BlogPostMenuProps) {
  const { t } = useTranslation("blog");
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const deleteMutation = useMutation(
    (deleteBlogPostCommand: DeleteBlogPostCommand) =>
      blogsApi.deletelogPost({ deleteBlogPostCommand })
  );

  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>();
  const open = Boolean(anchorEl);

  function handleClick(event: React.SyntheticEvent) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    /* eslint-disable-next-line unicorn/no-useless-undefined */
    setAnchorEl(undefined);
  }

  async function handleDelete(): Promise<void> {
    await deleteMutation.mutateAsync(
      { id },
      {
        onError: () => {
          snackbar.error(t("actions.delete.error"));
        },
        onSuccess: () => {
          queryClient.invalidateQueries([CacheKeysConstants.BlogPosts]);
        },
      }
    );
    handleClose();
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
        <MenuItem disabled={deleteMutation.isLoading} onClick={handleDelete}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          {t("menu.delete")}
        </MenuItem>
      </Menu>
    </>
  );
}
