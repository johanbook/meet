import { ObjectStorageService } from "../../object-storage.service";

/* eslint-disable unicorn/consistent-function-scoping */

class ObjectStorageServiceMock {
  delete = jest.fn();
  put = jest.fn(() => ({
    id: "my-object-id",
    url: "my-url",
  }));
}

export function createObjectStorageServiceMock(): ObjectStorageService {
  return new ObjectStorageServiceMock() as any;
}
