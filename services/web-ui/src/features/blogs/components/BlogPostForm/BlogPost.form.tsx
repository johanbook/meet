import { ReactElement, SyntheticEvent } from "react";

import { Close, InsertPhoto, Send } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";

import { CreateBlogPostRequest } from "src/api";
import { blogsApi } from "src/apis";
import { Photo } from "src/components/ui/Photo";
import { UploadIconButton } from "src/components/ui/UploadIconButton";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

import { BlobPhotos } from "./BlobPhotos";

interface BlogPostFormProps {
  onAfterSubmit?: () => void;
}

export function BlogPostForm({
  onAfterSubmit,
}: BlogPostFormProps): ReactElement {
  const mutation = useMutation({
    mutationFn: (command: CreateBlogPostRequest) =>
      blogsApi.createBlogPost(command),
  });

  const queryClient = useQueryClient();

  const snackbar = useSnackbar();

  const { t } = useTranslation("blog-creation");

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
      // TODO: Enable when there is proper image serialization
      // localStorageKey: "create-blog-post-form",
    },
  );

  function handleRemovePhoto(photoToDelete: Blob): void {
    const photos = form.state.photos.value;
    form.setValue({
      photos: photos?.filter((photo) => photo !== photoToDelete),
    });
  }

  async function handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    const { data } = form.validate();

    await mutation.mutateAsync(data, {
      onError: () => {
        snackbar.error(t("actions.create.error"));
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeysConstants.BlogPosts],
        });
        form.reset();

        if (onAfterSubmit) {
          onAfterSubmit();
        }
      },
    });
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
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

        <Box sx={{ display: "none", gap: 2, alignItems: "flex-start" }}>
          {form.state.photos.value?.map((photo, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <Photo
                alt=""
                src={photo}
                style={{
                  border: "1px solid rgb(200,200,200)",
                  borderRadius: 8,
                  marginTop: 10,
                  padding: 10,
                  width: 100,
                }}
              />

              <IconButton
                onClick={() => handleRemovePhoto(photo)}
                sx={{
                  bgcolor: "background.paper",
                  border: 1,
                  padding: 0,
                  position: "absolute",
                  top: 0,
                  right: -5,
                }}
              >
                <Close />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box>
          <BlobPhotos srcs={form.state.photos.value || []} />
        </Box>

        <TextField
          disabled={mutation.isPending}
          fullWidth
          multiline
          onChange={(event) => form.setValue({ content: event.target.value })}
          placeholder={t("form.placeholder") || ""}
          rows={4}
          value={form.state.content.value}
        />

        <Button
          color="primary"
          disabled={!form.state.content.value}
          loading={mutation.isPending}
          sx={{ mt: 4 }}
          type="submit"
          variant="contained"
        >
          <Send sx={{ mr: 2 }} />
          Submit
        </Button>
      </form>
    </Box>
  );
}
