import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { TestSeeder } from "src/core/database";

import { Profile } from "../entities/profile.entity";

@TestSeeder()
export default class CreateProfiles implements Seeder {
  // Ensure seeder only runs once
  track = true;

  public async run(
    _: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const factory = factoryManager.get(Profile);
    await factory.save();
  }
}
