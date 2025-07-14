import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { Profile } from "../entities/profile.entity";

export default setSeederFactory(Profile, (faker: Faker) => {
  const profile = new Profile();
  profile.dateOfBirth = faker.date.birthdate({ min: 18, max: 120 });
  profile.name = faker.person.firstName();
  profile.description = faker.lorem.paragraph();
  profile.userId = faker.string.uuid();

  // TODO: Use proper types here
  const recentLocation =
    `${faker.address.latitude()},${faker.address.longitude()}` as any;
  profile.recentLocation = recentLocation;

  return profile;
});
