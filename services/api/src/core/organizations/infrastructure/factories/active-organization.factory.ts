import { setSeederFactory } from "typeorm-extension";

import { ActiveOrganization } from "../entities/active-organization.entity";

export default setSeederFactory(ActiveOrganization, () => {
  return new ActiveOrganization();
});
