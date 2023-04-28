import { UserIdService } from "src/client/context/user-id.service";

/* eslint-disable unicorn/consistent-function-scoping */

class UserIdServiceMock {
  getUserId = jest.fn(() => "my-user-id");
}

export function createUserIdServiceMock(): UserIdService {
  return new UserIdServiceMock() as any;
}
