import { vi } from "src/test";

import { CurrentOrganizationService } from "../../domain/services/current-organization.service";

/* eslint-disable unicorn/consistent-function-scoping */

class CurrentOrganizationMock {
  fetchCurrentOrganization = vi.fn(() => ({ personal: false }));

  fetchCurrentOrganizationId = vi.fn();
}

export function createCurrentOrganizationServiceMock(): CurrentOrganizationService {
  return new CurrentOrganizationMock() as unknown as CurrentOrganizationService;
}
