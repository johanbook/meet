import { CurrentOrganizationService } from "../../domain/services/current-organization.service";

/* eslint-disable unicorn/consistent-function-scoping */

class CurrentOrganizationMock {
  fetchCurrentOrganization = jest.fn(() => ({ personal: true }));

  fetchCurrentOrganizationId = jest.fn();
}

export function createCurrentOrganizationMock(): CurrentOrganizationService {
  return new CurrentOrganizationMock() as any;
}
