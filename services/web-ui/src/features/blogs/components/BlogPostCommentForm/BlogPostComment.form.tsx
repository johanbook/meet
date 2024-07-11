import { ReactElement, SyntheticEvent } from "react";

import { Send } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import { CreateBlogPostCommentCommand } from "src/api";
import { blogsApi } from "src/apis";
import { useForm } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface BlogPostCommentFormProps {
  blogPostId: string;
}

export function BlogPostCommentForm({
  blogPostId,
}: BlogPostCommentFormProps): ReactElement {
  const mutation = useMutation({
    mutationFn: (createBlogPostCommentCommand: CreateBlogPostCommentCommand) =>
      blogsApi.createBlogPostComment({ createBlogPostCommentCommand }),
  });

  const queryClient = useQueryClient();

  const snackbar = useSnackbar();

  const { t } = useTranslation("blog");

  const form = useForm<CreateBlogPostCommentCommand>({
    blogPostId,
    content: "",
  });

  async function handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    const { data } = form.validate();

    await mutation.mutateAsync(data, {
      onError: () => {
        snackbar.error(t("actions.create-comment.error"));
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeysConstants.BlogPosts],
        });
        form.reset();
      },
    });
  }

  return (
    <Box sx={{ px: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          disabled={mutation.isPending}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {mutation.isPending ? (
                  <CircularProgress />
                ) : (
                  <IconButton
                    color="primary"
                    disabled={!form.state.content.value}
                    type="submit"
                  >
                    <Send />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          multiline
          onChange={(event) => form.setValue({ content: event.target.value })}
          placeholder={t("comments.placeholder") || ""}
          value={form.state.content.value}
        />
      </form>
    </Box>
  );
}
