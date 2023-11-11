import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { map } from "src/core/mapper";
import { CurrentProfileService, Profile } from "src/core/profiles";
import {
  createEventBusMock,
  createMockRepository,
  createUserIdServiceMock,
} from "src/test/mocks";

import { OrganizationService } from "../../../domain/services/organization.service";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { CreateOrganizationCommand } from "../../contracts/commands/create-organization.command";
import { CreateOrganizationHandler } from "./create-organization.handler";

describe(CreateOrganizationHandler.name, () => {
  let commandHandler: CreateOrganizationHandler;
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
    commandHandler = new CreateOrganizationHandler(
      currentProfileService,
      organizationService,
    );
  });

  describe("can create organizations", () => {
    it("should save changes to organizations", async () => {
      const command = map(CreateOrganizationCommand, {
        name: "my-name",
      });

      await commandHandler.execute(command);

      expect(organizations.save).toHaveBeenCalledTimes(1);
      expect(eventBus.publish).toHaveBeenCalledTimes(1);
    });
  });
});
