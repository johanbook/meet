import { Seeder } from "typeorm-extension";

export type Constructor<T> = new (...props: any[]) => T;

export const TestSeeder = () => {
  return function (constructor: Constructor<Seeder>) {
    const orignalExecutor = constructor.prototype.run;

    constructor.prototype.run = async function (...props: any) {
      if (process.env.NODE_ENV === "production") {
        return;
      }

      orignalExecutor.apply(this, props);
    };
  };
};
