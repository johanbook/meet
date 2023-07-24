import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";

import { Organization } from "../../infrastructure/entities/organization.entity";
import { OrganizationCreatedEvent } from "../events/organization-created.event";

@Injectable()
export class OrganizationService {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>,
  ) {}

  async createOrganization(organization: Organization): Promise<void> {
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
}
