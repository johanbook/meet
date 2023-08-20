import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { Profile } from "src/features/profiles";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { OrganizationService } from "../../../domain/services/organization.service";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { CreatePersonalOrganizationsIfMissingHandler } from "./create-personal-organizations-if-missing.handler";

describe(CreatePersonalOrganizationsIfMissingHandler.name, () => {
  let commandHandler: CreatePersonalOrganizationsIfMissingHandler;
  let eventBus: EventBus;
  let organizationService: OrganizationService;
  let organizations: Repository<Organization>;
  let profiles: Repository<Profile>;

  beforeEach(() => {
    eventBus = createEventBusMock();
    organizations = createMockRepository<Organization>();
    profiles = createMockRepository<Profile>([
      { organizationMemberships: [] } as any,
    ]);

    organizationService = new OrganizationService(
      eventBus,
      {} as any,
      organizations,
    );
    commandHandler = new CreatePersonalOrganizationsIfMissingHandler(
      organizationService,
      profiles,
    );
  });

  describe("creates organizations if missing", () => {
    it("should save changes to organizations", async () => {
      await commandHandler.execute();

      expect(organizations.save).toHaveBeenCalledTimes(1);
      expect(eventBus.publish).toHaveBeenCalledTimes(1);
    });
  });
});
