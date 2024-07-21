import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OrganizationPermission } from "../../infrastructure/entities/organization-permission.entity";

@Injectable()
export class OrganizationPermissionService {
  constructor(
    @InjectRepository(OrganizationPermission)
    private readonly organizationPermission: Repository<OrganizationPermission>,
  ) {}

  async fetchOrganizationPermissions(
    organizationId: number,
  ): Promise<string[]> {
    const matchingPermissions = await this.organizationPermission.find({
      select: {
        permission: true,
      },
      where: {
        organizationId,
      },
    });

    return matchingPermissions.map((x) => x.permission);
  }
}
