import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  onObserve: () => void;
}

export function useInfiniteScroll({ onObserve }: UseInfiniteScrollProps) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const current = observerTarget.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onObserve();
        }
      },
      { threshold: 0.1 },
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [observerTarget]);

  return { observerTarget };
}
