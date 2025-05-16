import { vi } from "src/test";

import { ObjectStorageService } from "../../object-storage.service";

/* eslint-disable unicorn/consistent-function-scoping */

class ObjectStorageServiceMock {
  delete = vi.fn();
  put = vi.fn(() => ({
    id: "my-object-id",
    url: "my-url",
  }));
}

export function createObjectStorageServiceMock(): ObjectStorageService {
  return new ObjectStorageServiceMock() as any;
}
