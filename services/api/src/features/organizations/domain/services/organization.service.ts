import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { Profile } from "src/features/profiles";

import { OrganizationMembership } from "../../infrastructure/entities/organization-membership.entity";
import { Organization } from "../../infrastructure/entities/organization.entity";
import { OrganizationCreatedEvent } from "../events/organization-created.event";

interface CreateOrganizationProps {
  name: string;
  owner: Profile;
  personal: boolean;
}

@Injectable()
export class OrganizationService {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>,
  ) {}

  async createOrganization(props: CreateOrganizationProps): Promise<void> {
    const organization = new Organization();

    organization.name = props.name;
    organization.personal = props.personal;

    const membership = await this.createMembership(organization, props.owner);
    organization.memberships = [membership];

    const createdOrganization = await this.organizations.save(organization);

    const event = map(OrganizationCreatedEvent, {
      id: createdOrganization.id,
      description: createdOrganization.description,
      name: createdOrganization.name,
    });

    this.eventBus.publish(event);
  }

  async updateOrganization(organization: Organization): Promise<void> {
    await this.organizations.save(organization);
  }

  private async createMembership(
    organization: Organization,
    profile: Profile,
  ): Promise<OrganizationMembership> {
    const membership = new OrganizationMembership();

    membership.organization = organization;
    membership.profile = profile;

    return membership;
  }
}
