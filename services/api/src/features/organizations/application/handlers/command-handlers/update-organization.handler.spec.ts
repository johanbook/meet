import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { CurrentOrganizationService } from "src/features/organizations/domain/services/current-organization.service";
import { Profile } from "src/features/profiles";
import {
  createEventBusMock,
  createMockRepository,
  createUserIdServiceMock,
} from "src/test/mocks";

import { OrganizationService } from "../../../domain/services/organization.service";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { UpdateOrganizationCommand } from "../../contracts/commands/update-organization.command";
import { UpdateOrganizationHandler } from "./update-organization.handler";

describe(UpdateOrganizationHandler.name, () => {
  let commandHandler: UpdateOrganizationHandler;
  let currentOrganizationService: CurrentOrganizationService;
  let eventBus: EventBus;
  let organizationService: OrganizationService;
  let organizations: Repository<Organization>;

  beforeEach(() => {
    eventBus = createEventBusMock();
    organizations = createMockRepository<Organization>();

    currentOrganizationService = new CurrentOrganizationService(
      {} as any,
      {} as any,
      createMockRepository<Profile>([
        {
          organizationMemberships: [{ organization: { personal: true } }],
        } as any,
      ]),
      createUserIdServiceMock(),
    );
    organizationService = new OrganizationService(
      eventBus,
      {} as any,
      organizations,
    );
    commandHandler = new UpdateOrganizationHandler(
      currentOrganizationService,
      organizationService,
    );
  });

  describe("can update organizations", () => {
    it("should save changes to organization", async () => {
      const command = map(UpdateOrganizationCommand, { name: "my-name" });
      await commandHandler.execute(command);

      expect(organizations.save).toHaveBeenCalledWith({
        name: "my-name",
        personal: true,
      });
    });
  });
});
