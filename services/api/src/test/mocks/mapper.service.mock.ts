import { MapperService } from "src/utils/mapper/mapper.service";

/* eslint-disable unicorn/consistent-function-scoping */

class MapperServiceMock {
  map = jest.fn((x) => x);
  mapArray = jest.fn((x) => x);
}

export function createMapperServiceMock(): MapperService {
  return new MapperServiceMock() as any;
}
