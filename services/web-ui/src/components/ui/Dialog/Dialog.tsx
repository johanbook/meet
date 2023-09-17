import { ReactElement, ReactNode } from "react";

import {
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material";

import { useDialog } from "src/core/dialog";

export interface DialogProps extends Omit<MuiDialogProps, "open"> {
  children: ReactNode;
  title?: string;
}

export function Dialog({
  children,
  title,
  ...props
}: DialogProps): ReactElement {
  const { closeDialog, isOpen } = useDialog();

  return (
    <MuiDialog open={isOpen} onClose={closeDialog} {...props}>
      {title && <DialogTitle> {title} </DialogTitle>}

      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
}
