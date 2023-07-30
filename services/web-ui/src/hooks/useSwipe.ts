import React from "react";

import { useSpring } from "@react-spring/web";
import { DragConfig, FullGestureState, useDrag } from "@use-gesture/react";

const DRAG_CONFIG: DragConfig = {
  delay: 500,
};

// Minimal distance for item to be dragged to be registered as a swipe
const SWIPING_POSITION_THRESHOLD = 100;

// How fast a drag event needs to be to in order to be registered as a swipe
const SWIPING_VELOCITY_THRESHOLD = 2;

function determineTriggerSwipe(state: FullGestureState<"drag">): boolean {
  if (state.down) {
    return false;
  }

  const [mx] = state.movement;
  const [vx] = state.velocity;

  const dx = Math.abs(mx);

  return vx > SWIPING_VELOCITY_THRESHOLD && dx > SWIPING_POSITION_THRESHOLD;
}

export interface UseSwipeProps {
  onSwipe: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function useSwipe({
  onSwipe,
  onSwipeLeft,
  onSwipeRight,
}: UseSwipeProps) {
  const [triggerIsActive, setTriggerIsActive] = React.useState(false);

  const [{ x }, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const bind = useDrag((dragState) => {
    const down = dragState.down;
    const [mx] = dragState.movement;
    const [dx] = dragState.direction;

    const triggerSwipe = determineTriggerSwipe(dragState);

    api.start(() => {
      let x = down ? mx : 0;

      if (triggerSwipe) {
        // TODO: Use this for swiping a card to a side
        x = dx * window.innerWidth;
      }

      return { x };
    });

    if (triggerSwipe && !triggerIsActive) {
      setTriggerIsActive(true);

      setTimeout(() => {
        setTriggerIsActive(false);
        api.start({ x: 0, immediate: true });

        if (mx < 0) {
          onSwipeLeft();
        } else {
          onSwipeRight();
        }

        onSwipe();
      }, 300);
    }
  }, DRAG_CONFIG);

  const bindProps = bind();
  return { ...bindProps, style: { x } };
}
