import { UserIdService } from "src/client/context/user-id.service";

/* eslint-disable unicorn/consistent-function-scoping */

class UserIdServiceMock {
  private readonly userId: number | string = "my-user-id";

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
