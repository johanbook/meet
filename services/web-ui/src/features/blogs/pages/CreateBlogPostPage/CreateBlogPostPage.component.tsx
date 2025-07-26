import { ReactElement, SyntheticEvent } from "react";

import { Add, Close, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { CreateBlogPostRequest } from "src/api";
import { blogsApi } from "src/apis";
import { Photo } from "src/components/ui/Photo";
import { UploadIconButton } from "src/components/ui/UploadIconButton";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeyEnum } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface CreateBlogPostPageComponentProps {
  onAfterSubmit?: () => void;
}

export function CreateBlogPostPageComponent({
  onAfterSubmit,
}: CreateBlogPostPageComponentProps): ReactElement {
  const mutation = useMutation({
    mutationFn: (command: CreateBlogPostRequest) =>
      blogsApi.createBlogPost(command),
  });

  const queryClient = useQueryClient();

  const snackbar = useSnackbar();

  const { t } = useTranslation("blog.creation");

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
          queryKey: [CacheKeyEnum.BlogPosts],
        });
        form.reset();

        if (onAfterSubmit) {
          onAfterSubmit();
        }
      },
    });
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("sections.description")}
        </Typography>
        <TextField
          disabled={mutation.isPending}
          fullWidth
          multiline
          minRows={2}
          onChange={(event) => form.setValue({ content: event.target.value })}
          placeholder={t("form.placeholder") || ""}
          value={form.state.content.value}
        />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("sections.photos")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {form.state.photos.value?.map((photo, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <Photo
                alt={t("sections.photoAlt") || ""}
                src={photo}
                sx={{
                  border: "1px solid",
                  borderRadius: 2,
                  marginTop: 1,
                  width: 100,
                }}
              />
              <IconButton
                aria-label={t("sections.removePhoto")}
                onClick={() => handleRemovePhoto(photo)}
                sx={{
                  backgroundColor: "background.paper",
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

          <UploadIconButton
            accept="image/*"
            multiple
            onChange={(photos) =>
              form.setValue({
                photos: [...(form.state.photos.value || []), ...photos],
              })
            }
            sx={{
              background: "background.paper",
              border: "1px solid",
              borderRadius: 2,
              height: "100%",
              marginTop: 1,
              width: 100,
            }}
          >
            <Add />
          </UploadIconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={mutation.isPending || !form.state.content.value}
          startIcon={
            mutation.isPending ? <CircularProgress size={20} /> : <Send />
          }
        >
          {t("actions.create.submit")}
        </Button>
      </Box>
    </Box>
  );
}
