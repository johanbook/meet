import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { CurrentOrganizationService } from "src/core/organizations";

import { OrganizationRole } from "../../organization-roles.enum";
import { REQUIRED_ORGANIZATION_ROLES_KEY } from "../decorators/requires-organization-permissions.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private currentOrganizationService: CurrentOrganizationService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<OrganizationRole[]>(
      REQUIRED_ORGANIZATION_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const currentMembership =
      await this.currentOrganizationService.fetchCurrentMembership();

    return requiredRoles.includes(currentMembership.role);
  }
}
