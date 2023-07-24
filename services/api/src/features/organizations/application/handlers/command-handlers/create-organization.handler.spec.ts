import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { OrganizationService } from "../../../domain/services/organization.service";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { CreateOrganizationCommand } from "../../contracts/commands/create-organization.command";
import { CreateOrganizationHandler } from "./create-organization.handler";

describe(CreateOrganizationHandler.name, () => {
  let commandHandler: CreateOrganizationHandler;
  let eventBus: EventBus;
  let organizationService: OrganizationService;
  let organizations: Repository<Organization>;

  beforeEach(() => {
    eventBus = createEventBusMock();
    organizations = createMockRepository<Organization>();
    organizationService = new OrganizationService(eventBus, organizations);
    commandHandler = new CreateOrganizationHandler(organizationService);
  });

  describe("can create organizations", () => {
    it("should save changes to organizations", async () => {
      const command = map(CreateOrganizationCommand, { name: "my-name" });
      await commandHandler.execute(command);

      expect(organizations.save).toHaveBeenCalledWith({
        name: "my-name",
      });

      expect(eventBus.publish).toHaveBeenCalledTimes(1);
    });
  });
});
