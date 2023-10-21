import { OrganizationMemberDetailsRoleEnum as Role } from "src/api";

export const Permissions = {
  Membership: {
    Invite: [Role.Admin],
    Edit: [Role.Admin],
  },
  Organization: {
    Leave: [Role.Admin, Role.Member],
    ViewRole: [Role.Admin],
  },
};
