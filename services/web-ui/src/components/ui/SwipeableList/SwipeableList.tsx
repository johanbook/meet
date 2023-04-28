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
  onSwipeLeft,
  onSwipeRight,
}: SwipeableListProps<T>): React.ReactElement {
  const { append, queue, shift } = useQueue<T>(data);

  const current = queue[0];
  const swipingProps = useSwipe({
    onSwipe: NOOP,
    onSwipeLeft: NOOP,
    onSwipeRight: NOOP,
  });

  React.useEffect(() => {
    if (queue.length < 2) {
      append([]);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [queue.length]);

  if (queue.length === 0) {
    return <p>No items to swipe on </p>;
  }

  async function handleSwipeLeft(): Promise<void> {
    onSwipeLeft(current);
    shift();
  }

  async function handleSwipeRight(): Promise<void> {
    onSwipeRight(current);
    shift();
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
        <Button onClick={handleSwipeLeft}>Left</Button>
        <Button onClick={handleSwipeRight}>Right</Button>
      </Box>
    </>
  );
}
