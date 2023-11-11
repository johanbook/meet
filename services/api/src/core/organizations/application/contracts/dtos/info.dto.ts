import { CurrentOrganizationDetails } from "./current-organization.dto";
import { OrganizationProfileDetails } from "./organization-profile.dto";

export class InfoDetails {
  organization!: CurrentOrganizationDetails;
  profile!: OrganizationProfileDetails;
}
