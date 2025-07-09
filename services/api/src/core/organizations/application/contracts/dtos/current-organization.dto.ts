import { OrganizationRole } from "src/core/authorization";

import { OrganizationFeatureEnum } from "../../../features.enum";
import { ThemeEnum } from "../../../theme.enum";
import { OrganizationDetails } from "./organization.dto";

export class CurrentOrganizationDetails extends OrganizationDetails {
  features!: OrganizationFeatureEnum[];
  role!: OrganizationRole;
  theme!: ThemeEnum;
}
