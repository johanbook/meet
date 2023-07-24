/* eslint-disable unicorn/consistent-function-scoping */
import { EventBus } from "@nestjs/cqrs";

class EventBusMock {
  publish = jest.fn();
}

export function createEventBusMock(): EventBus {
  return new EventBusMock() as any;
}
