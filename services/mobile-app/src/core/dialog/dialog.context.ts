import { ReactNode, createContext } from "react";

export interface GlobalDialogProps {
  closeDialog: () => void;
  isOpen: boolean;
  onClosed: () => void;
}

export interface IGlobalDialogContext {
  closeDialog(): void;
  isOpen: boolean;
  onClosed(): void;
  openDialog<T extends GlobalDialogProps>(
    element: (props: T) => ReactNode,
    props: Omit<T, keyof GlobalDialogProps>,
  ): void;
}

export const noopGlobalDialog: IGlobalDialogContext = {
  closeDialog: () => undefined,
  isOpen: false,
  onClosed: () => undefined,
  openDialog: () => undefined,
};

export const GlobalDialogContext = createContext<IGlobalDialogContext>(
  noopGlobalDialog,
);