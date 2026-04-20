import { UserIdService } from "src/core/authentication";

import { vi } from "..";
import { DEFAULT_MOCK_USERID } from "./constants";

class UserIdServiceMock {
  private readonly userId: number | string = DEFAULT_MOCK_USERID;

  constructor(userId?: number) {
    if (userId) {
      this.userId = userId;
    }
  }

  getUserId = vi.fn(() => this.userId);
}

export function createUserIdServiceMock(userId?: number): UserIdService {
  return new UserIdServiceMock(userId) as any;
}
