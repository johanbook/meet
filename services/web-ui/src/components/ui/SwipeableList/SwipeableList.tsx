import React from "react";

import { Box, Button } from "@mui/material";

import { useQueue } from "src/hooks/useQueue";

export interface SwipeableListItemProps<T> {
  data: T;
}

export interface SwipeableListProps<T> {
  children: React.FC<SwipeableListItemProps<T>>;
  data: T[];
  getItemId: (element: T) => number | string;
  onSwipeLeft: (element: T) => void;
  onSwipeRight: (element: T) => void;
  onRequestData: () => Promise<T[]>;
}

export function SwipeableList<T>({
  children,
  data,
  onSwipeLeft,
  onSwipeRight,
}: SwipeableListProps<T>): React.ReactElement {
  const { append, queue, shift } = useQueue<T>(data);

  React.useEffect(() => {
    append([]);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  if (queue.length === 0) {
    return <p>No items to swipe on </p>;
  }

  const current = queue[0];

  function handleSwipeLeft(): void {
    onSwipeLeft(current);
    shift();
  }

  function handleSwipeRight(): void {
    onSwipeRight(current);
    shift();
  }

  return (
    <>
      {children({ data: current })}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleSwipeLeft}>Left</Button>
        <Button onClick={handleSwipeRight}>Right</Button>
      </Box>
    </>
  );
}
