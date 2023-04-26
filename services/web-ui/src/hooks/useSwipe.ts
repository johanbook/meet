import React from "react";

import { useSpring } from "@react-spring/web";
import { FullGestureState, useDrag } from "@use-gesture/react";

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

export function useSwipe() {
  const [triggerIsActive, setTriggerIsActive] = React.useState(false);

  const [{ x }, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const bind = useDrag((dragState) => {
    const down = dragState.down;
    const [dx] = dragState.direction;
    const [mx] = dragState.movement;

    const triggerSwipe = determineTriggerSwipe(dragState);

    api.start(() => {
      let x = down ? mx : 0;

      if (triggerSwipe) {
        x = dx * window.innerWidth;
      }

      return { x };
    });

    if (triggerSwipe && !triggerIsActive) {
      setTimeout(() => {
        setTriggerIsActive(false);
        api.start({ x: 0, immediate: true });
      }, 300);
    }
  });

  const bindProps = bind();
  return { ...bindProps, style: { x } };
}
