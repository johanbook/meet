import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Profile } from "../entities/profile.entity";

export default class CreateProfiles implements Seeder {
  public async run(
    _: DataSource,
    factoryManger: SeederFactoryManager,
  ): Promise<void> {
    const factory = factoryManger.get(Profile);
    await factory.saveMany(50);
  }
}
