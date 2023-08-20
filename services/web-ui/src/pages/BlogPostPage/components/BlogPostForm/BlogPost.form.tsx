import React, { SyntheticEvent } from "react";
import { useMutation, useQueryClient } from "react-query";

import { InsertPhoto, Send } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

import { CreateBlogPostRequest } from "src/api";
import { blogsApi } from "src/apis";
import { Photo } from "src/components/ui/Photo";
import { UploadIconButton } from "src/components/ui/UploadIconButton";
import { useForm } from "src/core/forms";
import { useTranslation } from "src/core/i18n";

export function BlogPostForm(): React.ReactElement {
  const mutation = useMutation((command: CreateBlogPostRequest) =>
    blogsApi.createBlogPost(command)
  );

  const queryClient = useQueryClient();

  const { t } = useTranslation("blog");

  const form = useForm<CreateBlogPostRequest>({ content: "", photos: [] });

  async function handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    await mutation.mutateAsync(form.value, {
      onSuccess: () => {
        queryClient.invalidateQueries(["blog-posts"]);
        form.reset();
      },
    });
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          disabled={mutation.isLoading}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disabled={!form.value.content} type="submit">
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <UploadIconButton
                  accept="image/*"
                  multiple
                  onChange={(photos) =>
                    form.setValue({
                      photos: [...(form.value?.photos || []), ...photos],
                    })
                  }
                >
                  <InsertPhoto />
                </UploadIconButton>
              </InputAdornment>
            ),
          }}
          multiline
          onChange={(event) => form.setValue({ content: event.target.value })}
          placeholder={t("form.placeholder") || ""}
          rows={4}
          value={form.value.content}
        />

        {form.value.photos?.map((photo, index) => (
          <Photo
            alt=""
            key={index}
            src={photo}
            style={{
              border: "1px solid rgb(200,200,200)",
              borderRadius: 8,
              marginTop: 10,
              maxWidth: 200,
              padding: 10,
            }}
          />
        ))}
      </form>
    </Box>
  );
}
