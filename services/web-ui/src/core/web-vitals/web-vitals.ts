export function registerWebVitalsReporter(
  onReport?: (entry: unknown) => void,
): void {
  if (onReport && onReport instanceof Function) {
    import("web-vitals").then(({ onCLS, onFCP, onINP, onLCP }) => {
      onCLS(onReport);
      onFCP(onReport);
      onINP(onReport);
      onLCP(onReport);
    });
  }
}
