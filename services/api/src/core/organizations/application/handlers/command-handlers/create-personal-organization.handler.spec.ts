import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { CurrentProfileService, Profile } from "src/core/profiles";
import { beforeEach, describe, expect, it } from "src/test";
import {
  createEventBusMock,
  createMockRepository,
  createUserIdServiceMock,
} from "src/test/mocks";

import { OrganizationService } from "../../../domain/services/organization.service";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { CreatePersonalOrganizationHandler } from "./create-personal-organization.handler";

describe(CreatePersonalOrganizationHandler.name, () => {
  let commandHandler: CreatePersonalOrganizationHandler;
  let currentProfileService: CurrentProfileService;
  let eventBus: EventBus;
  let organizationService: OrganizationService;
  let organizations: Repository<Organization>;
  let profiles: Repository<Profile>;
  let userIdService: UserIdService;

  beforeEach(() => {
    eventBus = createEventBusMock();
    organizations = createMockRepository<Organization>();
    profiles = createMockRepository<Profile>([{} as any]);
    userIdService = createUserIdServiceMock();

    currentProfileService = new CurrentProfileService(profiles, userIdService);
    organizationService = new OrganizationService(
      eventBus,
      {} as any,
      organizations,
    );
    commandHandler = new CreatePersonalOrganizationHandler(
      currentProfileService,
      organizationService,
    );
  });

  describe("can create organizations", () => {
    it("should save changes to organizations", async () => {
      await commandHandler.execute();

      expect(organizations.save).toHaveBeenCalledTimes(1);
      expect(eventBus.publish).toHaveBeenCalledTimes(1);
    });
  });
});
