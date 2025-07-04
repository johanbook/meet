import { OrganizationRole } from "src/core/authorization";

export const organizationPermissions = {
  CurrentOrganization: {
    Delete: [OrganizationRole.Admin],
    Read: [OrganizationRole.Admin, OrganizationRole.Member],
    Members: {
      Add: [OrganizationRole.Admin],
      Read: [OrganizationRole.Admin, OrganizationRole.Member],
      UpdateRole: [OrganizationRole.Admin],
      Remove: [OrganizationRole.Admin],
    },
    Update: [OrganizationRole.Admin],
  },
};
