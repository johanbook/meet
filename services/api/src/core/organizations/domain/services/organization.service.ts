import { Injectable, NotFoundException } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OrganizationRole } from "src/core/authorization";
import { map } from "src/core/mapper";

import { OrganizationMembership } from "../../infrastructure/entities/organization-membership.entity";
import { Organization } from "../../infrastructure/entities/organization.entity";
import { MemberAddedToOrganizationEvent } from "../events/member-added-to-organization.event";
import { OrganizationCreatedEvent } from "../events/organization-created.event";
import { OrganizationDeletedEvent } from "../events/organization-deleted.event";
import { MembershipService } from "./membership.service";

interface CreateOrganizationProps {
  name: string;
  ownerId: number;
  personal: boolean;
}

@Injectable()
export class OrganizationService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly membershipService: MembershipService,
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>,
  ) {}

  async addMember(organizationId: number, profileId: number): Promise<void> {
    const organization = await this.organizations.findOne({
      relations: {
        memberships: true,
      },
      where: {
        id: organizationId,
      },
    });

    if (!organization) {
      throw new NotFoundException("Organization not found");
    }

    const membership = await this.createMembership(
      organization,
      profileId,
      OrganizationRole.Member,
    );
    organization.memberships.push(membership);

    await this.organizations.save(organization);

    const event = map(MemberAddedToOrganizationEvent, {
      organizationId,
      profileId,
    });

    this.eventBus.publish(event);
  }

  async checkIfMember(
    profileId: number,
    organizationId: number,
  ): Promise<boolean> {
    return this.membershipService.checkIfMember(profileId, organizationId);
  }

  async createOrganization(props: CreateOrganizationProps): Promise<number> {
    const organization = new Organization();

    organization.name = props.name;
    organization.personal = props.personal;

    const membership = await this.createMembership(
      organization,
      props.ownerId,
      OrganizationRole.Admin,
    );
    organization.memberships = [membership];

    const createdOrganization = await this.organizations.save(organization);

    const event = map(OrganizationCreatedEvent, {
      id: createdOrganization.id,
      description: createdOrganization.description,
      name: createdOrganization.name,
    });

    this.eventBus.publish(event);

    return createdOrganization.id;
  }

  async deleteOrganization(organizationId: number): Promise<void> {
    const { affected } = await this.organizations.delete(organizationId);

    if (affected === 0) {
      return;
    }

    const event = map(OrganizationDeletedEvent, {
      id: organizationId,
    });

    this.eventBus.publish(event);
  }

  async checkIfPersonalOrganizationExists(profileId: number): Promise<boolean> {
    return await this.organizations.exist({
      where: {
        memberships: {
          profileId,
        },
        personal: true,
      },
    });
  }

  async updateOrganization(organization: Organization): Promise<void> {
    await this.organizations.save(organization);
  }

  private async createMembership(
    organization: Organization,
    profileId: number,
    role: OrganizationRole,
  ): Promise<OrganizationMembership> {
    const membership = new OrganizationMembership();

    membership.organization = organization;
    membership.profileId = profileId;
    membership.role = role;

    return membership;
  }
}
