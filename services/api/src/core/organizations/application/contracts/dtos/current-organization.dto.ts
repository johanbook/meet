import { OrganizationRole } from "src/core/authorization";
import { OrganizationFeatureEnum } from "src/core/organizations/features.enum";

import { OrganizationDetails } from "./organization.dto";

export class CurrentOrganizationDetails extends OrganizationDetails {
  features!: OrganizationFeatureEnum[];
  role!: OrganizationRole;
  theme!: string;
}
