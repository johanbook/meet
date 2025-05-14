import { FC, createContext } from "react";

const NOOP = () => {};

export interface GlobalDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
}

export interface IGlobalDialogContext {
  closeDialog: () => void;
  isOpen: boolean;
  onClosed: () => void;
  openDialog: <T extends GlobalDialogProps>(
    element: FC<T>,
    props: Omit<T, keyof GlobalDialogProps>,
  ) => void;
}

export const GlobalDialogContext = createContext<IGlobalDialogContext>({
  closeDialog: NOOP,
  isOpen: false,
  onClosed: NOOP,
  openDialog: NOOP,
});
