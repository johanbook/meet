import { ReactElement, SyntheticEvent } from "react";

import { Box, TextField, Typography } from "@mui/material";

import { CreateTimeSeriesCommand } from "src/api";
import { timeSeriesApi } from "src/apis";
import { Button } from "src/components/ui";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface CreateTimeSeriesPageComponentProps {
  onAfterSubmit?: () => void;
}

export function CreateTimeSeriesPageComponent({
  onAfterSubmit,
}: CreateTimeSeriesPageComponentProps): ReactElement {
  const mutation = useMutation({
    mutationFn: (createTimeSeriesCommand: CreateTimeSeriesCommand) =>
      timeSeriesApi.createTimeSeries({ createTimeSeriesCommand }),
  });

  const queryClient = useQueryClient();

  const snackbar = useSnackbar();

  const { t } = useTranslation("time-series.creation");

  const form = useForm<CreateTimeSeriesCommand>(
    {
      name: "",
      description: "",
    },
    {
      name: validators.required(),
      description: () => false,
    },
  );

  async function handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    const { data } = form.validate();

    await mutation.mutateAsync(data, {
      onError: () => {
        snackbar.error(t("actions.create.error"));
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeysConstants.TimeSeries],
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
          {t("form.name.label")}
        </Typography>
        <TextField
          disabled={mutation.isPending}
          fullWidth
          onChange={(event) => form.setValue({ name: event.target.value })}
          placeholder={t("form.name.placeholder") || ""}
          value={form.state.name.value}
        />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("form.description.label")}
        </Typography>
        <TextField
          disabled={mutation.isPending}
          fullWidth
          multiline
          minRows={2}
          onChange={(event) =>
            form.setValue({ description: event.target.value })
          }
          placeholder={t("form.description.placeholder") || ""}
          value={form.state.description.value}
        />
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
          color="primary"
          disabled={!form.state.name.value}
          loading={mutation.isPending}
          type="submit"
          variant="contained"
        >
          {t("actions.create.submit")}
        </Button>
      </Box>
    </Box>
  );
}
