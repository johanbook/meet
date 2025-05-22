import { Repository } from "typeorm";

import { beforeEach, describe, expect, it, vi } from "src/test";
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
      fetchCurrentOrganizationId: vi.fn(),
    } as any;

    const photosService = { getUrl: vi.fn() } as any;

    queryHandler = new GetOrganizationMembersHandler(
      currentOrganizationService,
      organizationMemberships,
      photosService,
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
