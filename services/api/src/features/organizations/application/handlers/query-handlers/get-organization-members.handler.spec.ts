import { Repository } from "typeorm";

import { createMockRepository } from "src/test/mocks";

import { OrganizationMembership } from "../../../infrastructure/entities/organization-membership.entity";
import { GetOrganizationMembersHandler } from "./get-organization-members.handler";

describe(GetOrganizationMembersHandler.name, () => {
  let queryHandler: GetOrganizationMembersHandler;
  let organizationMemberships: Repository<OrganizationMembership>;

  beforeEach(() => {
    organizationMemberships = createMockRepository<OrganizationMembership>([
      { profileId: 1 },
    ] as any);

    const currentOrganizationService = {
      fetchCurrentOrganizationId: jest.fn(),
    } as any;
    queryHandler = new GetOrganizationMembersHandler(
      currentOrganizationService,
      organizationMemberships,
    );
  });

  describe("can fetch memberships", () => {
    it("should return objects", async () => {
      const result = await queryHandler.execute();

      expect(result).toEqual([{ profileId: 1 }]);
    });
  });
});
