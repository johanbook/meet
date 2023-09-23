import { Box, CircularProgress } from "@mui/material";

import { useInfiniteScroll } from "./useInfiniteScroll";

interface InteractionObserverProps {
  onObserve: () => void;
}

export function InteractionObserver({ onObserve }: InteractionObserverProps) {
  const { observerTarget } = useInfiniteScroll({
    onObserve,
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 100,
      }}
      ref={observerTarget}
    >
      <CircularProgress />
    </Box>
  );
}
