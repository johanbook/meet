import { CurrentOrganizationService } from "../../domain/services/current-organization.service";

/* eslint-disable unicorn/consistent-function-scoping */

class CurrentOrganizationMock {
  fetchCurrentOrganization = jest.fn(() => ({ personal: false }));

  fetchCurrentOrganizationId = jest.fn();
}

export function createCurrentOrganizationServiceMock(): CurrentOrganizationService {
  return new CurrentOrganizationMock() as unknown as CurrentOrganizationService;
}
