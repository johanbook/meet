import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { CurrentOrganizationService } from "src/features/organizations";
import { OrganizationMembershipRole as Role } from "src/features/organizations/infrastructure/entities/organization-membership.entity";

import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private currentOrganizationService: CurrentOrganizationService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const currentMembership =
      await this.currentOrganizationService.fetchCurrentMembership();

    return requiredRoles.includes(currentMembership.role);
  }
}
