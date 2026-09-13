import { View } from "react-native";

import { GlobalDialogProps } from "src/core/dialog";
import { useTheme } from "src/core/theme";

import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";

export interface ConfirmationDialogProps extends GlobalDialogProps {
  description?: string;
  onConfirm: (onSuccess: () => void) => void;
  title: string;
}

export function ConfirmationDialog({
  closeDialog,
  description,
  onConfirm,
  title,
}: ConfirmationDialogProps) {
  const theme = useTheme();

  function handleConfirm(): void {
    onConfirm(closeDialog);
  }

  return (
    <View
      style={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 16,
        elevation: 8,
        padding: 24,
        width: "90%",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      {description ? (
        <Typography color="textSecondary" variant="body2">
          {description}
        </Typography>
      ) : null}
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
        <Button color="primary" onPress={handleConfirm} variant="contained">
          Confirm
        </Button>
      </View>
    </View>
  );
}