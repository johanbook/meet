import { OrganizationMemberDetailsRoleEnum as Role } from "src/api";

export const Permissions = {
  Membership: {
    Edit: [Role.Admin],
  },
  Organization: {
    Leave: [Role.Admin, Role.Member],
    ViewRole: [Role.Admin],
  },
};
