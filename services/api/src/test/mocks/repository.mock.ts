import { ObjectLiteral, Repository } from "typeorm";

import { vi } from "..";

/* eslint-disable unicorn/consistent-function-scoping */

class MockRepository<T extends ObjectLiteral> {
  private currentId = 1;

  constructor(private data: T[] = []) {}

  delete = vi.fn((id: string | number) => {
    const index = this.data.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Cannot find item with id '${id}' to delete`);
    }

    this.data.splice(index, 1);

    return { affected: 1 };
  });

  exist = vi.fn((element: T) =>
    this.data.find((item) => item.id === element.where.id),
  );

  find = vi.fn(() => this.data);

  findAll = vi.fn(() => this.data);

  findOne = vi.fn(() => this.data[0]);

  remove = vi.fn((element: T) => {
    this.delete(element.id);
  });

  save = vi.fn((element: T) => {
    if (!element.id) {
      const item = { ...element, id: this.currentId };

      this.currentId++;
      this.data.push(item);

      return item;
    }

    const index = this.data.findIndex((item) => item.id === element.id);

    if (index === -1) {
      throw new Error(`Cannot find item with id '${element.id}' to update`);
    }

    this.data[index] = { ...this.data[index], ...element };
    return this.data[index];
  });
}

export function createMockRepository<T extends ObjectLiteral>(
  data?: T[],
): Repository<T> {
  return new MockRepository(data) as unknown as Repository<T>;
}
