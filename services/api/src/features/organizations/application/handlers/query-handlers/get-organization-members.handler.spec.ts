import { Repository } from "typeorm";

import { createMockRepository } from "src/test/mocks";

import { OrganizationMembership } from "../../../infrastructure/entities/organization-membership.entity";
import { GetOrganizationMembersHandler } from "./get-organization-members.handler";

describe(GetOrganizationMembersHandler.name, () => {
  const date = new Date();
  let queryHandler: GetOrganizationMembersHandler;
  let organizationMemberships: Repository<OrganizationMembership>;

  beforeEach(() => {
    organizationMemberships = createMockRepository<OrganizationMembership>([
      {
        created: date,
        profile: { name: "my-name" },
        profileId: 1,
      },
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

      expect(result).toEqual([
        {
          joinedAt: date.toISOString(),
          name: "my-name",
          profileId: 1,
        },
      ]);
    });
  });
});
