import { Grow } from "@mui/material";
import { VariantType, enqueueSnackbar } from "notistack";

import { Logger } from "src/core/logging";
import { useIsMobile } from "src/hooks/useIsMobile";

const logger = new Logger("Snackbar");

export function useSnackbar() {
  const isMobile = useIsMobile();

  function showSnackbar(message: string, variant: VariantType): void {
    switch (variant) {
      case "error": {
        logger.error(message);
        break;
      }
      case "warning": {
        logger.warn(message);
        break;
      }
      default: {
        logger.debug(message);
        break;
      }
    }

    enqueueSnackbar(message, {
      anchorOrigin: {
        horizontal: isMobile ? "center" : "right",
        vertical: "bottom",
      },
      TransitionComponent: Grow,
      variant,
    });
  }

  return {
    error: (message: string) => showSnackbar(message, "error"),
    info: (message: string) => showSnackbar(message, "info"),
    success: (message: string) => showSnackbar(message, "success"),
    warn: (message: string) => showSnackbar(message, "warning"),
  };
}
