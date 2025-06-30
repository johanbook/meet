import { FC, forwardRef } from "react";

import { SnackbarContent as MuiSnackbarContent, SxProps } from "@mui/material";
import {
  CustomContentProps,
  SnackbarProvider as NotistackSnackbarProvider,
  VariantType,
} from "notistack";

const AUTO_HIDE_DURATION_MS = 3000;

const getSxProps = (variant: VariantType): SxProps => {
  if (variant === "error") {
    return {
      backgroundColor: "error.main",
    };
  }

  return {};
};

const SnackbarContent = forwardRef<HTMLDivElement, CustomContentProps>(
  (props, reference) => {
    return (
      <MuiSnackbarContent
        className={props.className}
        message={props.message}
        ref={reference}
        style={props.style}
        sx={getSxProps(props.variant)}
      />
    );
  },
);
SnackbarContent.displayName = "SnackbarContent";

// NB: There is also a css class for this in `App.css`
// to handle offset
export const SnackbarProvider: FC = () => {
  return (
    <NotistackSnackbarProvider
      autoHideDuration={AUTO_HIDE_DURATION_MS}
      Components={{
        default: SnackbarContent,
        error: SnackbarContent,
        info: SnackbarContent,
        success: SnackbarContent,
        warning: SnackbarContent,
      }}
      dense
    />
  );
};
