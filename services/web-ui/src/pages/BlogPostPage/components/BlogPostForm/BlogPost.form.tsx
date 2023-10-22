import React, { SyntheticEvent } from "react";
import { useMutation, useQueryClient } from "react-query";

import { InsertPhoto, Send } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import { CreateBlogPostRequest } from "src/api";
import { blogsApi } from "src/apis";
import { Photo } from "src/components/ui/Photo";
import { UploadIconButton } from "src/components/ui/UploadIconButton";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export function BlogPostForm(): React.ReactElement {
  const mutation = useMutation((command: CreateBlogPostRequest) =>
    blogsApi.createBlogPost(command)
  );

  const queryClient = useQueryClient();

  const snackbar = useSnackbar();

  const { t } = useTranslation("blog");

  const form = useForm<CreateBlogPostRequest>(
    {
      content: "",
      descriptions: [],
      photos: [],
    },
    {
      content: validators.required(),
      descriptions: () => false,
      photos: () => false,
    },
    {
      localStorageKey: "create-blog-post-form",
    }
  );

  async function handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    const { data } = form.validate();

    await mutation.mutateAsync(data, {
      onError: () => {
        snackbar.error(t("actions.create.error"));
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CacheKeysConstants.BlogPosts]);
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
                {mutation.isLoading ? (
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
            startAdornment: (
              <InputAdornment position="start">
                <UploadIconButton
                  accept="image/*"
                  multiple
                  onChange={(photos) =>
                    form.setValue({
                      photos: [...(form.state.photos.value || []), ...photos],
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
          value={form.state.content.value}
        />

        {form.state.photos.value?.map((photo, index) => (
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
