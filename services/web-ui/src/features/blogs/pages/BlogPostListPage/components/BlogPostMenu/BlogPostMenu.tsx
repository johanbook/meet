import { ReactElement } from "react";

import { Delete, MoreVert } from "@mui/icons-material";
import { ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

import { DeleteBlogPostCommand } from "src/api";
import { blogsApi } from "src/apis";
import { ConfirmationDialog } from "src/components/ui";
import { Menu } from "src/components/ui/Menu";
import { useDialog } from "src/core/dialog";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface BlogPostMenuProps {
  id: string;
}

export function BlogPostMenu({ id }: BlogPostMenuProps): ReactElement {
  const { t } = useTranslation("blog");
  const { openDialog } = useDialog();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const deleteMutation = useMutation({
    mutationFn: (deleteBlogPostCommand: DeleteBlogPostCommand) =>
      blogsApi.deletelogPost({ deleteBlogPostCommand }),
  });

  async function handleDelete(onSuccess: () => void): Promise<void> {
    await deleteMutation.mutateAsync(
      { id },
      {
        onError: () => {
          snackbar.error(t("actions.delete.error"));
        },
        onSuccess: () => {
          onSuccess();
          snackbar.success(t("actions.delete.success"));
          queryClient.invalidateQueries({
            queryKey: [CacheKeysConstants.BlogPosts],
          });
        },
      }
    );
  }

  function handleClickDelete(): void {
    openDialog(ConfirmationDialog, {
      description: t("actions.delete.dialog.description"),
      onConfirm: handleDelete,
      title: t("actions.delete.dialog.title"),
    });
  }

  return (
    <Menu
      Button={({ onClick }) => (
        <IconButton onClick={onClick}>
          <MoreVert />
        </IconButton>
      )}
    >
      <MenuItem disabled={deleteMutation.isPending} onClick={handleClickDelete}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText>{t("menu.delete")}</ListItemText>
      </MenuItem>
    </Menu>
  );
}
