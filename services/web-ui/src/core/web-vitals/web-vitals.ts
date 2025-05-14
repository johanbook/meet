export function registerWebVitalsReporter(
  onReport?: (entry: unknown) => void,
): void {
  if (onReport && typeof onReport === "function") {
    import("web-vitals").then(({ onCLS, onFCP, onINP, onLCP }) => {
      onCLS(onReport);
      onFCP(onReport);
      onINP(onReport);
      onLCP(onReport);
    });
  }
}
