import { createContext, useContext } from "react";

export type SnackbarVariant = "error" | "info" | "success" | "warning";

export interface SnackbarMessage {
  id: number;
  message: string;
  variant: SnackbarVariant;
}

export interface SnackbarContext {
  error: (message: string) => void;
  info: (message: string) => void;
  success: (message: string) => void;
  warn: (message: string) => void;
}

export const noopSnackbar: SnackbarContext = {
  error: () => undefined,
  info: () => undefined,
  success: () => undefined,
  warn: () => undefined,
};

export const snackbarContext = createContext<SnackbarContext>(noopSnackbar);

export function useSnackbar(): SnackbarContext {
  return useContext(snackbarContext);
}