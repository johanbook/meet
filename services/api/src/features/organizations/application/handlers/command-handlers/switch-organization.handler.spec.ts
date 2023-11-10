import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { CurrentOrganizationService } from "../../../domain/services/current-organization.service";
import { OrganizationService } from "../../../domain/services/organization.service";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { createCurrentOrganizationMock } from "../../../test/mocks/current-organization.service.mock";
import { SwitchOrganizationCommand } from "../../contracts/commands/switch-organization.command";
import { SwitchOrganizationHandler } from "./switch-organization.handler";

describe(SwitchOrganizationHandler.name, () => {
  let commandHandler: SwitchOrganizationHandler;
  let currentOrganizationService: CurrentOrganizationService;
  let eventBus: EventBus;
  let organizationService: OrganizationService;
  let organizations: Repository<Organization>;

  beforeEach(() => {
    eventBus = createEventBusMock();

    organizations = createMockRepository<Organization>();

    currentOrganizationService = createCurrentOrganizationMock();

    organizationService = new OrganizationService(
      eventBus,
      {} as any,
      organizations,
    );

    commandHandler = new SwitchOrganizationHandler(
      currentOrganizationService,
      {} as any,
      organizationService,
    );
  });

  describe("can switch organization", () => {
    it("should save changes to organization", async () => {
      const command = map(SwitchOrganizationCommand, { organizationId: 1 });
      await commandHandler.execute(command);

      expect(organizations.save).toHaveBeenCalledWith({
        name: "my-name",
        personal: true,
      });
    });
  });
});
