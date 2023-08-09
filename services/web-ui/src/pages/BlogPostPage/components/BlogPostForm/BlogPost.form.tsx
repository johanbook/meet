import React, { SyntheticEvent } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Box, TextField } from "@mui/material";

import { CreateBlogPostCommand } from "src/api";
import { blogsApi } from "src/apis";

export function BlogPostForm(): React.ReactElement {
  const mutation = useMutation((createBlogPostCommand: CreateBlogPostCommand) =>
    blogsApi.createBlogPost({ createBlogPostCommand })
  );

  const queryClient = useQueryClient();

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
          onChange={(event) => setContent(event.target.value)}
          placeholder="Say something about your day"
          value={content}
        />
      </form>
    </Box>
  );
}
