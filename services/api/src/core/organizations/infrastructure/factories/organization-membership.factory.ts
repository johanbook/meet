import { setSeederFactory } from "typeorm-extension";

import { OrganizationMembership } from "../entities/organization-membership.entity";

export default setSeederFactory(OrganizationMembership, () => {
  return new OrganizationMembership();
});
