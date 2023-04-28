import React from "react";

import { useSpring } from "@react-spring/web";
import { DragConfig, FullGestureState, useDrag } from "@use-gesture/react";

const DRAG_CONFIG: DragConfig = {
  delay: 1000,
};

const SWIPING_VELOCITY_THRESHOLD = 2;

function determineTriggerSwipe(state: FullGestureState<"drag">): boolean {
  const [vx] = state.velocity;

  return vx > SWIPING_VELOCITY_THRESHOLD;
}

export interface UseSwipeProps {
  onSwipe: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function useSwipe({ onSwipe }: UseSwipeProps) {
  const [triggerIsActive, setTriggerIsActive] = React.useState(false);

  const [{ x }, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const bind = useDrag((dragState) => {
    const down = dragState.down;
    const [mx] = dragState.movement;

    const triggerSwipe = determineTriggerSwipe(dragState);

    api.start(() => {
      const x = down ? mx : 0;

      if (triggerSwipe) {
        // TODO: Use this for swiping a card to a side
        // x = dx * window.innerWidth;
      }

      return { x };
    });

    if (triggerSwipe && !triggerIsActive) {
      setTimeout(() => {
        setTriggerIsActive(false);
        // TODO: Use this for reseting a card
        // api.start({ x: 0, immediate: true });
        onSwipe();
      }, 300);
    }
  }, DRAG_CONFIG);

  const bindProps = bind();
  return { ...bindProps, style: { x } };
}
