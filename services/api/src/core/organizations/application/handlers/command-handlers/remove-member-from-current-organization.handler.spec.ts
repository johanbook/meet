import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createMockRepository } from "src/test/mocks";

import { CurrentOrganizationService } from "../../../domain/services/current-organization.service";
import { OrganizationMembership } from "../../../infrastructure/entities/organization-membership.entity";
import { createCurrentOrganizationServiceMock } from "../../../test/mocks/current-organization.service.mock";
import { RemoveMemberFromCurrentOrganizationCommand } from "../../contracts/commands/remove-member-from-current-organization.command";
import { RemoveMemberFromCurrentOrganizationHandler } from "./remove-member-from-current-organization.handler";

describe(RemoveMemberFromCurrentOrganizationHandler.name, () => {
  let commandHandler: RemoveMemberFromCurrentOrganizationHandler;
  let currentOrganizationService: CurrentOrganizationService;
  let memberships: Repository<OrganizationMembership>;

  beforeEach(() => {
    memberships = createMockRepository<OrganizationMembership>();

    currentOrganizationService = createCurrentOrganizationServiceMock();

    commandHandler = new RemoveMemberFromCurrentOrganizationHandler(
      { authorizeOwnerOrAdmin: jest.fn() } as any,
      currentOrganizationService,
      memberships,
    );
  });

  describe("can remove member", () => {
    it("should save throw if  membership does not exist", async () => {
      const command = map(RemoveMemberFromCurrentOrganizationCommand, {
        membershipId: 1,
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Membership not found",
      );
    });

    it("should remove membership from database", async () => {
      const membership = await memberships.save(new OrganizationMembership());

      expect(memberships.find()).toHaveLength(1);

      const command = map(RemoveMemberFromCurrentOrganizationCommand, {
        membershipId: membership.id,
      });

      await commandHandler.execute(command);

      expect(memberships.find()).toHaveLength(0);
    });
  });
});
