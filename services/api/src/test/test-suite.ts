import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import {
  CurrentOrganizationService,
  Organization,
} from "src/core/organizations";
import { ActiveOrganizationService } from "src/core/organizations/domain/services/active-organization.service";
import { MembershipService } from "src/core/organizations/domain/services/membership.service";
import { OrganizationService } from "src/core/organizations/domain/services/organization.service";
import { ActiveOrganization } from "src/core/organizations/infrastructure/entities/active-organization.entity";
import { OrganizationMembership } from "src/core/organizations/infrastructure/entities/organization-membership.entity";
import { CurrentProfileService, Profile } from "src/core/profiles";

import {
  createEventBusMock,
  createMockRepository,
  createUserIdServiceMock,
} from "./mocks";

export class TestSuite {
  eventBus: EventBus;

  activeOrganizations: Repository<ActiveOrganization>;
  memberships: Repository<OrganizationMembership>;
  organizations: Repository<Organization>;
  profiles: Repository<Profile>;

  activeOrganizationSerivce: ActiveOrganizationService;
  currentOrganizationService: CurrentOrganizationService;
  currentProfileService: CurrentProfileService;
  membershipService: MembershipService;
  organizationService: OrganizationService;

  constructor() {
    this.eventBus = createEventBusMock();

    this.activeOrganizations = createMockRepository<ActiveOrganization>();
    this.memberships = createMockRepository<OrganizationMembership>();
    this.organizations = createMockRepository<Organization>([
      { id: "my-organization-id" } as any,
    ]);
    this.profiles = createMockRepository<Profile>([
      { id: "my-profile-id" } as any,
    ]);

    const userIdService = createUserIdServiceMock();

    this.currentProfileService = new CurrentProfileService(
      this.profiles,
      userIdService,
    );

    this.membershipService = new MembershipService(
      this.currentProfileService,
      this.memberships,
    );

    this.activeOrganizationSerivce = new ActiveOrganizationService(
      this.activeOrganizations,
      this.currentProfileService,
    );

    this.currentOrganizationService = new CurrentOrganizationService(
      this.activeOrganizationSerivce,
      this.membershipService,
      this.organizations,
    );

    this.organizationService = new OrganizationService(
      this.eventBus,
      this.membershipService,
      this.organizations,
    );
  }
}
