import { ReactElement, SyntheticEvent } from "react";

import { Box } from "@mui/material";

import { AddPointToTimeSeriesCommand } from "src/api";
import { timeSeriesApi } from "src/apis";
import { Button } from "src/components/ui";
import { TextField } from "src/components/ui";
import { Dialog } from "src/components/ui/Dialog";
import { GlobalDialogProps } from "src/core/dialog";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface AddTimeSeriesPointDialogProps extends GlobalDialogProps {
  timeSeriesId: string;
}

export function AddTimeSeriesPointDialog({
  closeDialog,
  timeSeriesId,
}: AddTimeSeriesPointDialogProps): ReactElement {
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
      value: 1,
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

    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

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
        closeDialog();
      },
    });
  }

  return (
    <Dialog
      Actions={({ closeDialog }) => (
        <>
          <Button onClick={closeDialog}>{t("actions.create.cancel")}</Button>

          <Button
            color="primary"
            disabled={!form.isValid}
            loading={mutation.isPending}
            onClick={handleSubmit}
            type="submit"
            variant="contained"
          >
            {t("actions.create.submit")}
          </Button>
        </>
      )}
      onClose={() => form.reset()}
      title={t("actions.create.header") || ""}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          disabled={mutation.isPending}
          error={form.state.value.error}
          fullWidth
          label={t("form.value.label")}
          onChange={(value) => form.setValue({ value: Number(value) })}
          placeholder={t("form.value.placeholder")}
          type="number"
          value={String(form.state.value.value)}
        />

        <TextField
          disabled={mutation.isPending}
          error={form.state.label.error}
          fullWidth
          label={t("form.label.label")}
          onChange={(label) => form.setValue({ label })}
          placeholder={t("form.label.placeholder")}
          value={form.state.label.value}
        />

        <TextField
          disabled={mutation.isPending}
          error={form.state.description.error}
          fullWidth
          label={t("form.description.label")}
          multiline
          minRows={2}
          onChange={(description) => form.setValue({ description })}
          placeholder={t("form.description.placeholder")}
          value={form.state.description.value}
        />
      </Box>
    </Dialog>
  );
}
