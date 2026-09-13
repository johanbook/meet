import { View } from "react-native";

import { timeSeriesApi } from "src/apis";
import { Button, TextField, Typography } from "src/components/ui";
import { GlobalDialogProps } from "src/core/dialog";
import { required, useForm } from "src/core/forms";
import {
  CacheKeyEnum,
  useMutation,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { useTheme } from "src/core/theme";

interface AddTimeSeriesPointDialogProps extends GlobalDialogProps {
  timeSeriesId: string;
}

interface AddPointForm {
  description: string;
  label: string;
  value: string;
}

export function AddTimeSeriesPointDialog({
  closeDialog,
  timeSeriesId,
}: AddTimeSeriesPointDialogProps) {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const form = useForm<AddPointForm>(
    {
      description: "",
      label: "",
      value: "1",
    },
    {
      description: required(),
      label: required(),
      value: required(),
    },
  );

  const mutation = useMutation({
    mutationFn: ({ description, label, value }: AddPointForm) =>
      timeSeriesApi.addPointToTimeSeries({
        addPointToTimeSeriesCommand: {
          description,
          label,
          timeSeriesId,
          value: Number(value),
        },
      }),
  });

  function handleSubmit(): void {
    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    mutation.mutate(data, {
      onError: () => snackbar.error("Unable to add point"),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeyEnum.TimeSeries, timeSeriesId],
        });
        form.reset();
        snackbar.success("Point added");
        closeDialog();
      },
    });
  }

  return (
    <View
      style={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 16,
        padding: 24,
        width: "90%",
      }}
    >
      <Typography variant="h6">Add point</Typography>
      <TextField
        error={form.state.value.error}
        keyboardType="number-pad"
        label="Value"
        onValueChange={(value) => form.setValue({ value })}
        value={form.state.value.value}
      />
      <TextField
        error={form.state.label.error}
        label="Label"
        onValueChange={(value) => form.setValue({ label: value })}
        value={form.state.label.value}
      />
      <TextField
        error={form.state.description.error}
        label="Description"
        minRows={2}
        multiline
        onValueChange={(value) => form.setValue({ description: value })}
        value={form.state.description.value}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Button onPress={closeDialog} variant="text">
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={!form.isValid || mutation.isPending}
          onPress={handleSubmit}
          variant="contained"
        >
          Add point
        </Button>
      </View>
    </View>
  );
}