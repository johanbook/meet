import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { Profile } from "src/core/profiles";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { CurrentOrganizationService } from "../../../domain/services/current-organization.service";
import { OrganizationService } from "../../../domain/services/organization.service";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { createCurrentOrganizationServiceMock } from "../../../test/mocks/current-organization.service.mock";
import { AddMemberToOrganizationCommand } from "../../contracts/commands/add-member-to-organization.command";
import { AddMemberToOrganizationHandler } from "./add-member-to-organization.handler";

describe(AddMemberToOrganizationHandler.name, () => {
  let commandHandler: AddMemberToOrganizationHandler;
  let currentOrganizationService: CurrentOrganizationService;
  let eventBus: EventBus;
  let organizationService: OrganizationService;
  let organizations: Repository<Organization>;
  let profiles: Repository<Profile>;

  beforeEach(() => {
    eventBus = createEventBusMock();
    organizations = createMockRepository<Organization>([
      { memberships: [] } as any,
    ]);
    profiles = createMockRepository<Profile>([]);

    currentOrganizationService = createCurrentOrganizationServiceMock();

    organizationService = new OrganizationService(
      eventBus,
      { checkIfMember: jest.fn(() => false) } as any,
      organizations,
    );
    commandHandler = new AddMemberToOrganizationHandler(
      currentOrganizationService,
      organizationService,
      profiles,
    );
  });

  describe("can add member", () => {
    it("should save throw if profile does not exist", async () => {
      const command = map(AddMemberToOrganizationCommand, {
        profileId: 1,
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Profile not found",
      );
    });

    it("should save changes to organizations", async () => {
      profiles.save({ profileId: 1 } as any);

      const command = map(AddMemberToOrganizationCommand, {
        profileId: 1,
      });

      await commandHandler.execute(command);

      expect(organizations.save).toHaveBeenCalledTimes(1);
    });
  });
});
