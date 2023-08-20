import { ObjectLiteral, Repository } from "typeorm";

/* eslint-disable unicorn/consistent-function-scoping */

class MockRepository<T extends ObjectLiteral> {
  private currentId = 1;

  constructor(private data: T[] = []) {}

  exist = jest.fn((element: T) => this.data.includes(element));

  find = jest.fn(() => this.data);

  findAll = jest.fn(() => this.data);

  findOne = jest.fn(() => this.data[0]);

  remove = jest.fn((element: T) => {
    const index = this.data.findIndex((item) => item.id === element.id);

    if (index < 0) {
      throw new Error("Item not found");
    }

    this.data.splice(index, 1);
  });

  save = jest.fn((element: T) => {
    if (!("id" in element)) {
      const item = { id: this.currentId, ...element };

      this.currentId++;
      this.data.push(item);

      return item;
    }

    const index = this.data.findIndex((item) => item.id === element.id);

    if (index < 0) {
      throw new Error("Item not found");
    }

    this.data[index] = { ...this.data[index], ...element };
    return this.data[index];
  });
}

export function createMockRepository<T extends ObjectLiteral>(
  data?: T[],
): Repository<T> {
  return new MockRepository(data) as any;
}
