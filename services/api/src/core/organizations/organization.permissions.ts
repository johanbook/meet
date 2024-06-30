import { OrganizationRole } from "src/core/authorization";

export const organizationPermissions = {
  CurrentOrganization: {
    Read: [OrganizationRole.Admin, OrganizationRole.Member],
    Members: {
      Add: [OrganizationRole.Admin],
      Read: [OrganizationRole.Admin, OrganizationRole.Member],
      UpdateRole: [OrganizationRole.Admin],
    },
    Update: [OrganizationRole.Admin],
  },
};
