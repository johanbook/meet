import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";

import { Permission } from "../infrastructure/entitities/permission.entity";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissions: Repository<Permission>,
    private readonly userIdService: UserIdService,
  ) {}

  async fetchPermissions(): Promise<string[]> {
    const userId = this.userIdService.getUserId();

    const currentUserPermissions = await this.permissions.find({
      where: { userId },
    });

    return currentUserPermissions.map((permission) => permission.name);
  }
}
