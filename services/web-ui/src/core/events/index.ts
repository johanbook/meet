export abstract class BaseEvent {}

type Constructor<T> = new (...props: any) => T;

export function dispatchEvent<T extends BaseEvent>(event: T) {
  const customEvent = new CustomEvent(event.constructor.name, {
    detail: event,
  });
  document.dispatchEvent(customEvent);
}

export function addEventListener<T extends BaseEvent>(
  event: Constructor<T>,
  onEvent: (event: T) => void,
): void {
  document.addEventListener(event.name, (event) => {
    const customEvent = event as CustomEvent<T>;
    onEvent(customEvent.detail);
  });
}
