import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { Organization } from "../entities/organization.entity";

export default setSeederFactory(Organization, (faker: Faker) => {
  const organization = new Organization();
  organization.name = faker.lorem.words(3);
  organization.description = faker.lorem.sentence();

  return organization;
});
