import { EventBus } from "@nestjs/cqrs";

import { vi } from "..";

class EventBusMock {
  publish = vi.fn();
}

export function createEventBusMock(): EventBus {
  return new EventBusMock() as unknown as EventBus;
}
