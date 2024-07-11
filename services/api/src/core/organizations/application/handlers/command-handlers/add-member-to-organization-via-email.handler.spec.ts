import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { map } from "src/core/mapper";
import { Profile } from "src/core/profiles";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { CurrentOrganizationService } from "../../../domain/services/current-organization.service";
import { OrganizationService } from "../../../domain/services/organization.service";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { createCurrentOrganizationServiceMock } from "../../../test/mocks/current-organization.service.mock";
import { AddMemberToOrganizationViaEmailCommand } from "../../contracts/commands/add-member-to-organization-via-email.command";
import { AddMemberToOrganizationViaEmailHandler } from "./add-member-to-organization-via-email.handler";

describe(AddMemberToOrganizationViaEmailHandler.name, () => {
  let commandHandler: AddMemberToOrganizationViaEmailHandler;
  let currentOrganizationService: CurrentOrganizationService;
  let eventBus: EventBus;
  let organizationService: OrganizationService;
  let organizations: Repository<Organization>;
  let profiles: Repository<Profile>;
  let userIdService: UserIdService;

  const email = "example@com";

  beforeEach(() => {
    eventBus = createEventBusMock();
    organizations = createMockRepository<Organization>([
      { memberships: [] } as any,
    ]);
    profiles = createMockRepository<Profile>([]);

    currentOrganizationService = createCurrentOrganizationServiceMock();

    userIdService = { fetchUserIdByEmail: jest.fn() } as any;

    organizationService = new OrganizationService(
      eventBus,
      { checkIfMember: jest.fn(() => false) } as any,
      organizations,
    );
    commandHandler = new AddMemberToOrganizationViaEmailHandler(
      currentOrganizationService,
      organizationService,
      profiles,
      userIdService,
    );
  });

  describe("can add member", () => {
    it("should throw if profile does not exist", async () => {
      const command = map(AddMemberToOrganizationViaEmailCommand, {
        email,
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Email not found",
      );
    });

    it("should save changes to organizations", async () => {
      profiles.save({ profileId: 1 } as any);

      (userIdService.fetchUserIdByEmail as any).mockReturnValue("my-user-id");

      const command = map(AddMemberToOrganizationViaEmailCommand, {
        email,
      });

      await commandHandler.execute(command);

      expect(organizations.save).toHaveBeenCalledTimes(1);
    });

    it("should throw if personal organization", async () => {
      (
        currentOrganizationService.fetchCurrentOrganization as any
      ).mockReturnValue({ personal: true });

      const command = map(AddMemberToOrganizationViaEmailCommand, {
        email,
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Cannot invite member to personal organization",
      );
    });
  });
});
