import { useEffect, useRef } from "react";

interface useInfiniteScrollProps {
  onNext: () => Promise<void>;
}

export function useInfiniteScroll({ onNext }: useInfiniteScrollProps) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const current = observerTarget.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onNext();
        }
      },
      { threshold: 1 }
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
  }, [observerTarget.current]);

  return { observerTarget };
}
