import { Repository } from "typeorm";

import { CurrentProfileService } from "src/core/profiles";
import { createMockRepository } from "src/test/mocks";

import { ActiveOrganization } from "../../infrastructure/entities/active-organization.entity";
import { ActiveOrganizationService } from "./active-organization.service";

describe(ActiveOrganizationService.name, () => {
  let activeOrganizations: Repository<ActiveOrganization>;
  let activeOrganizationService: ActiveOrganizationService;
  let currentProfileService: CurrentProfileService;

  beforeEach(() => {
    activeOrganizations = createMockRepository<ActiveOrganization>([
      {
        id: "my-id",
        organizationId: 1,
      } as any,
    ]);
    currentProfileService = {
      fetchCurrentProfileId: jest.fn(() => "my-profile-id"),
    } as any;

    activeOrganizationService = new ActiveOrganizationService(
      activeOrganizations,
      currentProfileService,
    );
  });

  describe("cache", () => {
    it("should update cache when switching organizations", async () => {
      const initialValue =
        await activeOrganizationService.fetchCurrentActiveOrganization();

      expect(initialValue?.organizationId).toBe(1);

      await activeOrganizationService.switchCurrentOrganization(2);

      const updatedValue =
        await activeOrganizationService.fetchCurrentActiveOrganization();

      expect(updatedValue?.organizationId).toBe(2);
    });
  });
});
