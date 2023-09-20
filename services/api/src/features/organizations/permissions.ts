import { OrganizationMembershipRole as Role } from "./infrastructure/entities/organization-membership.entity";

export const permissions = {
  CurrentOrganization: {
    Read: [Role.Admin, Role.Member],
    Members: {
      Add: [Role.Admin],
      Read: [Role.Admin, Role.Member],
      UpdateRole: [Role.Admin],
    },
    Update: [Role.Admin],
  },
};
