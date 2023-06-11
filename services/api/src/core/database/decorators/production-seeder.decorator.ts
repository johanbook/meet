import { Seeder } from "typeorm-extension";

export type Constructor<T> = new (...props: any[]) => T;

export const ProductionSeeder = () => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  return function (_: Constructor<Seeder>) {};
};
