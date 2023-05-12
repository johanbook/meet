import { ObjectLiteral, Repository } from "typeorm";

/* eslint-disable unicorn/consistent-function-scoping */

class MockRepository<T extends ObjectLiteral> {
  constructor(private readonly data: T[] = []) {}

  exist = jest.fn((element: T) => this.data.includes(element));
  find = jest.fn(() => this.data);
  findAll = jest.fn(() => this.data);
  findOne = jest.fn(() => this.data[0]);
  remove = jest.fn();
  save = jest.fn();
}

export function createMockRepository<T extends ObjectLiteral>(
  data?: T[],
): Repository<T> {
  return new MockRepository(data) as any;
}
