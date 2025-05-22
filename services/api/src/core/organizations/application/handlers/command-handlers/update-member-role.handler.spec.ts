import { Repository } from "typeorm";

import { OrganizationRole } from "src/core/authorization";
import { map } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations/domain/services/current-organization.service";
import { createCurrentOrganizationServiceMock } from "src/core/organizations/test";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { OrganizationMembership } from "../../../infrastructure/entities/organization-membership.entity";
import { UpdateMemberRoleCommand } from "../../contracts/commands/update-member-role.command";
import { UpdateMemberRoleHandler } from "./update-member-role.handler";

describe(UpdateMemberRoleHandler.name, () => {
  let currentOrganizationService: CurrentOrganizationService;
  let commandHandler: UpdateMemberRoleHandler;
  let memberships: Repository<OrganizationMembership>;

  beforeEach(() => {
    currentOrganizationService = createCurrentOrganizationServiceMock();
    memberships = createMockRepository<OrganizationMembership>([{}] as any);

    commandHandler = new UpdateMemberRoleHandler(
      currentOrganizationService,
      { fetchCurrentProfileId: vi.fn(() => 1) } as any,
      memberships,
    );
  });

  describe("can update organizations", () => {
    it("should save changes to organization", async () => {
      const command = map(UpdateMemberRoleCommand, {
        id: 1,
        role: OrganizationRole.Member,
      });
      await commandHandler.execute(command);

      expect(memberships.save).toHaveBeenCalledWith({
        role: "member",
      });
    });
  });
});
