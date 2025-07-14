import { setSeederFactory } from "typeorm-extension";

import { OrganizationFeature } from "../entities/organization-feature.entity";

export default setSeederFactory(OrganizationFeature, () => {
  return new OrganizationFeature();
});
