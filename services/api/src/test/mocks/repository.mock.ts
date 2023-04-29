import { ObjectLiteral, Repository } from "typeorm";

class MockRepository {
  exist = jest.fn();
  findAll = jest.fn();
  findOne = jest.fn();
  save = jest.fn();
}

export function createMockRepository<T extends ObjectLiteral>(): Repository<T> {
  return new MockRepository() as any;
}
