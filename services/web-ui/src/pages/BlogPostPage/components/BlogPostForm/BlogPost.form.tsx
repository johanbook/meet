import React, { SyntheticEvent } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Box, TextField } from "@mui/material";

import { CreateBlogPostRequest } from "src/api";
import { blogsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";

export function BlogPostForm(): React.ReactElement {
  const mutation = useMutation((command: CreateBlogPostRequest) =>
    blogsApi.createBlogPost(command)
  );

  const queryClient = useQueryClient();

  const { t } = useTranslation("blog");

  const [content, setContent] = React.useState("");

  async function handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    await mutation.mutateAsync(
      { content },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["blog-posts"]);
          setContent("");
        },
      }
    );
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          disabled={mutation.isLoading}
          fullWidth
          multiline
          onChange={(event) => setContent(event.target.value)}
          placeholder={t("form.placeholder") || ""}
          value={content}
        />
      </form>
    </Box>
  );
}
