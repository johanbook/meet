import { OrganizationRole } from "src/core/authorization";

import { OrganizationDetails } from "./organization.dto";

export class CurrentOrganizationDetails extends OrganizationDetails {
  features!: string[];
  role!: OrganizationRole;
  theme!: string;
}
