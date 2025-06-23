import { ReactElement, SyntheticEvent } from "react";

import { Close, InsertPhoto, Send } from "@mui/icons-material";
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
import { CacheKeysConstants } from "src/core/query";
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      {/* Section 1: Photo Upload */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("sections.photos")}
        </Typography>
        <Box sx={{ mb: 2 }}>
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
        </Box>
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
                style={{
                  border: "1px solid rgb(200,200,200)",
                  borderRadius: 8,
                  marginTop: 10,
                  padding: 10,
                  width: 100,
                }}
              />
              <IconButton
                aria-label={t("sections.removePhoto")}
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
      </Box>

      {/* Section 2: Description/Content */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("sections.description")}
        </Typography>
        <TextField
          disabled={mutation.isPending}
          fullWidth
          multiline
          minRows={4}
          onChange={(event) => form.setValue({ content: event.target.value })}
          placeholder={t("form.placeholder") || ""}
          value={form.state.content.value}
          InputProps={{}}
        />
      </Box>

      {/* Section 3: Submit Button */}
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
