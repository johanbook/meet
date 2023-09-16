import { OrganizationMembershipRole } from "../../../infrastructure/entities/organization-membership.entity";
import { OrganizationDetails } from "./organization.dto";

export class CurrentOrganizationDetails extends OrganizationDetails {
  role!: OrganizationMembershipRole;
}
