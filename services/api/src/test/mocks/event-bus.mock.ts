import { EventBus } from "@nestjs/cqrs";

class EventBusMock {
  publish = jest.fn();
}

export function createEventBusMock(): EventBus {
  return new EventBusMock() as unknown as EventBus;
}
