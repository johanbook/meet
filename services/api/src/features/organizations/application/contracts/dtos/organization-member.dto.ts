import { OrganizationMembershipRole } from "../../../infrastructure/entities/organization-membership.entity";

export class OrganizationMemberDetails {
  joinedAt!: string;
  name!: string;
  id!: number;
  imageUrl?: string;
  profileId!: number;
  role!: OrganizationMembershipRole;
}
