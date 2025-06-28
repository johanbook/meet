import { FC, ReactElement, ReactNode } from "react";

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material";

import { useDialog } from "src/core/dialog";

export interface DialogProps extends Omit<MuiDialogProps, "open"> {
  Actions?: FC<{ closeDialog: () => void }>;
  children: ReactNode;
  title?: string;
}

export function Dialog({
  Actions,
  children,
  title,
  ...props
}: DialogProps): ReactElement {
  const { closeDialog, isOpen } = useDialog();

  return (
    <MuiDialog open={isOpen} onClose={closeDialog} {...props}>
      {title && <DialogTitle> {title} </DialogTitle>}

      <DialogContent dividers>{children}</DialogContent>

      {Actions && (
        <DialogActions>
          <Actions closeDialog={closeDialog} />
        </DialogActions>
      )}
    </MuiDialog>
  );
}
