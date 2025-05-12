import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations/domain/services/current-organization.service";
import { createCurrentOrganizationServiceMock } from "src/core/organizations/test";
import { beforeEach, describe, expect, it } from "src/test";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

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

    currentOrganizationService = createCurrentOrganizationServiceMock();

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
        personal: false,
      });
    });
  });
});
