import { ObjectLiteral, Repository } from "typeorm";

class MockRepository {
  findAll = jest.fn();
}

export function createMockRepository<T extends ObjectLiteral>() {
  return new MockRepository() as any as Repository<T>;
}
