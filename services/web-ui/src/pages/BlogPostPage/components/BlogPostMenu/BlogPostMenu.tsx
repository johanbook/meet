import { ReactElement } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Delete, MoreVert } from "@mui/icons-material";
import { ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

import { DeleteBlogPostCommand } from "src/api";
import { blogsApi } from "src/apis";
import { Menu } from "src/components/ui/Menu";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface BlogPostMenuProps {
  id: string;
}

export function BlogPostMenu({ id }: BlogPostMenuProps): ReactElement {
  const { t } = useTranslation("blog");
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const deleteMutation = useMutation(
    (deleteBlogPostCommand: DeleteBlogPostCommand) =>
      blogsApi.deletelogPost({ deleteBlogPostCommand })
  );

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
  }

  return (
    <Menu
      Button={({ onClick }) => (
        <IconButton onClick={onClick}>
          <MoreVert />
        </IconButton>
      )}
    >
      <MenuItem disabled={deleteMutation.isLoading} onClick={handleDelete}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText>{t("menu.delete")}</ListItemText>
      </MenuItem>
    </Menu>
  );
}
