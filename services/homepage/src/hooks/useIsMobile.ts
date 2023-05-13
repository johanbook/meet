import useMediaQuery from "@mui/material/useMediaQuery";

export function useIsMobile(): boolean {
  return !useMediaQuery("(min-width:600px)");
}
