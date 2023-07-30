import React from "react";

import { Box, Button } from "@mui/material";
import { animated } from "@react-spring/web";

import { useQueue } from "src/hooks/useQueue";
import { useSwipe } from "src/hooks/useSwipe";

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
const NOOP = () => {};

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
  onRequestData,
  onSwipeLeft,
  onSwipeRight,
}: SwipeableListProps<T>): React.ReactElement {
  const { append, queue, shift } = useQueue<T>(data);

  async function handleSwipeLeft(): Promise<void> {
    onSwipeLeft(current);
    shift();
  }

  async function handleSwipeRight(): Promise<void> {
    onSwipeRight(current);
    shift();
  }

  async function handleFetchData(): Promise<void> {
    const newData = await onRequestData();
    append(newData);
  }

  const current = queue[0];
  const swipingProps = useSwipe({
    onSwipe: NOOP,
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
  });

  React.useEffect(() => {
    if (queue.length > 1) {
      return;
    }

    handleFetchData();

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [queue.length]);

  if (queue.length === 0) {
    return <p>No items to swipe on </p>;
  }

  return (
    <>
      <animated.div
        {...swipingProps}
        style={{ ...swipingProps.style, touchAction: "pan-y" }}
      >
        {children({ data: current })}
      </animated.div>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleSwipeLeft}>Skip</Button>
        <Button onClick={handleSwipeRight}>Like</Button>
      </Box>
    </>
  );
}
