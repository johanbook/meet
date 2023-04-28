import { Grow } from "@mui/material";
import { VariantType, enqueueSnackbar } from "notistack";

function showSnackbar(message: string, variant: VariantType): void {
  enqueueSnackbar(message, {
    anchorOrigin: {
      horizontal: "center",
      vertical: "bottom",
    },
    TransitionComponent: Grow,
    variant,
  });
}

export function useSnackbar() {
  return {
    error: (message: string) => showSnackbar(message, "error"),
    success: (message: string) => showSnackbar(message, "success"),
  };
}
