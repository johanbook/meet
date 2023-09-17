import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { CurrentOrganizationService } from "src/features/organizations/domain/services/current-organization.service";
import { Profile } from "src/features/profiles";
import { createMockRepository, createUserIdServiceMock } from "src/test/mocks";

import { ActiveOrganization } from "../../../infrastructure/entities/active-organization.entity";
import {
  OrganizationMembership,
  OrganizationMembershipRole,
} from "../../../infrastructure/entities/organization-membership.entity";
import { UpdateMemberRoleCommand } from "../../contracts/commands/update-member-role.command";
import { UpdateMemberRoleHandler } from "./update-member-role.handler";

describe(UpdateMemberRoleHandler.name, () => {
  let activeOrganizations: Repository<ActiveOrganization>;
  let commandHandler: UpdateMemberRoleHandler;
  let currentOrganizationService: CurrentOrganizationService;
  let memberships: Repository<OrganizationMembership>;

  beforeEach(() => {
    activeOrganizations = createMockRepository<ActiveOrganization>();
    memberships = createMockRepository<OrganizationMembership>([{}] as any);

    const currentProfileService = { fetchCurrentProfileId: jest.fn() } as any;

    currentOrganizationService = new CurrentOrganizationService(
      activeOrganizations,
      currentProfileService,
      {} as any,
      {} as any,
      createMockRepository<Profile>([
        {
          organizationMemberships: [{ organization: { personal: true } }],
        } as any,
      ]),
      createUserIdServiceMock(),
    );

    commandHandler = new UpdateMemberRoleHandler(
      currentOrganizationService,
      memberships,
    );
  });

  describe("can update organizations", () => {
    it("should save changes to organization", async () => {
      const command = map(UpdateMemberRoleCommand, {
        id: 1,
        role: OrganizationMembershipRole.Member,
      });
      await commandHandler.execute(command);

      expect(memberships.save).toHaveBeenCalledWith({
        role: "member",
      });
    });
  });
});
