import { Factory, Seeder } from "typeorm-seeding";

import { Profile } from "../entities/profile.entity";

export default class CreateProfiles implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Profile)().createMany(2);
  }
}
