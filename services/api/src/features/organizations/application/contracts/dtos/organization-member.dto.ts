import { OrganizationRole } from "src/core/authorization/organization-roles.enum";

export class OrganizationMemberDetails {
  joinedAt!: string;
  name!: string;
  id!: number;
  imageUrl?: string;
  profileId!: number;
  role!: OrganizationRole;
}
