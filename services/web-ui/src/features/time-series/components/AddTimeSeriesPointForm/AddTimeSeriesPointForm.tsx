import { ReactElement, SyntheticEvent } from "react";

import { Box, Typography } from "@mui/material";

import { AddPointToTimeSeriesCommand } from "src/api";
import { timeSeriesApi } from "src/apis";
import { Button } from "src/components/ui";
import { TextField } from "src/components/ui";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface AddTimeSeriesPointFormProps {
  timeSeriesId: string;
  onAfterSubmit?: () => void;
}

export function AddTimeSeriesPointForm({
  timeSeriesId,
  onAfterSubmit,
}: AddTimeSeriesPointFormProps): ReactElement {
  const mutation = useMutation({
    mutationFn: (addPointToTimeSeriesCommand: AddPointToTimeSeriesCommand) =>
      timeSeriesApi.addPointToTimeSeries({ addPointToTimeSeriesCommand }),
  });

  const queryClient = useQueryClient();
  const snackbar = useSnackbar();
  const { t } = useTranslation("time-series-point-creation");

  const form = useForm<AddPointToTimeSeriesCommand>(
    {
      description: "",
      label: "",
      timeSeriesId,
      value: 0,
    },
    {
      description: validators.required(),
      label: validators.required(),
      timeSeriesId: validators.required(),
      value: validators.required(),
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
          queryKey: [CacheKeysConstants.TimeSeries, timeSeriesId],
        });
        form.reset();
        snackbar.success(t("actions.create.success"));

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
          {t("form.value.label")}
        </Typography>
        <TextField
          disabled={mutation.isPending}
          error={form.state.value.error}
          fullWidth
          onChange={(value) => form.setValue({ value: Number(value) })}
          placeholder={t("form.value.placeholder")}
          type="number"
          value={String(form.state.value.value)}
        />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("form.label.label")}
        </Typography>
        <TextField
          disabled={mutation.isPending}
          error={form.state.label.error}
          fullWidth
          onChange={(label) => form.setValue({ label })}
          placeholder={t("form.label.placeholder")}
          value={form.state.label.value}
        />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("form.description.label")}
        </Typography>
        <TextField
          disabled={mutation.isPending}
          error={form.state.description.error}
          fullWidth
          multiline
          minRows={2}
          onChange={(description) => form.setValue({ description })}
          placeholder={t("form.description.placeholder")}
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
          disabled={
            !form.state.value.value ||
            !form.state.label.value ||
            !form.state.description.value
          }
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
