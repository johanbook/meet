type Listener<E> = (event: E) => void;

type Constructor<T> = {
  new (...props: never[]): T;
  readonly name: string;
};

const listenerStorage = new Map<string, unknown[]>();

function listenersFor<E>(name: string): Listener<E>[] {
  const handlers = listenerStorage.get(name);

  if (!handlers) {
    const created: Listener<E>[] = [];
    listenerStorage.set(name, created);

    return created;
  }

  return handlers as Listener<E>[];
}

export abstract class BaseEvent {}

export function dispatchEvent<T extends BaseEvent>(event: T): void {
  for (const listener of listenersFor<T>(event.constructor.name)) {
    listener(event);
  }
}

export function addEventListener<T extends BaseEvent>(
  event: Constructor<T>,
  onEvent: (event: T) => void,
): void {
  listenersFor<T>(event.name).push(onEvent);
}
