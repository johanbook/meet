import { FC, ReactElement, ReactNode } from "react";

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material";

import { useDialog } from "src/core/dialog";

export interface DialogProps extends Omit<MuiDialogProps, "onClose" | "open"> {
  Actions?: FC<{ closeDialog: () => void }>;
  children: ReactNode;
  onClose?: () => void;
  title?: string;
}

export function Dialog({
  Actions,
  children,
  maxWidth = "xs",
  onClose,
  title,
  ...props
}: DialogProps): ReactElement {
  const { closeDialog, isOpen } = useDialog();

  const handleClose = () => {
    closeDialog();

    // For e.g. clean up such as resetting form state
    if (onClose) {
      onClose();
    }
  };

  return (
    <MuiDialog
      maxWidth={maxWidth}
      open={isOpen}
      onClose={handleClose}
      {...props}
    >
      {title && <DialogTitle> {title} </DialogTitle>}

      <DialogContent dividers>{children}</DialogContent>

      {Actions && (
        <DialogActions>
          <Actions closeDialog={handleClose} />
        </DialogActions>
      )}
    </MuiDialog>
  );
}
