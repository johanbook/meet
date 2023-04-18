import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";

/* eslint-disable unicorn/consistent-function-scoping */

class ObjectStorageServiceMock {
  put = jest.fn(() => ({ url: "my-url" }));
}

export function createObjectStorageServiceMock(): ObjectStorageService {
  return new ObjectStorageServiceMock() as any;
}
