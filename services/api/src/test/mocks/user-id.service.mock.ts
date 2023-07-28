import { UserIdService } from "src/client/context/user-id.service";

import { DEFAULT_MOCK_USERID } from "./constants";

/* eslint-disable unicorn/consistent-function-scoping */

class UserIdServiceMock {
  private readonly userId: number | string = DEFAULT_MOCK_USERID;

  constructor(userId?: number) {
    if (userId) {
      this.userId = userId;
    }
  }

  getUserId = jest.fn(() => this.userId);
}

export function createUserIdServiceMock(userId?: number): UserIdService {
  return new UserIdServiceMock(userId) as any;
}
