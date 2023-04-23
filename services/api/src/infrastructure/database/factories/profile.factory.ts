import { Faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";

import { Profile } from "../entities/profile.entity";

define(Profile, (faker: Faker) => {
  const profile = new Profile();
  profile.name = faker.name.firstName();
  profile.description = faker.lorem.paragraph();
  profile.userId = faker.datatype.uuid();
  profile.photos = [];

  return profile;
});
