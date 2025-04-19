import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { RequiresOrganizationPermissions } from "src/core/authorization";

import { AddMemberToOrganizationViaEmailCommand } from "../../application/contracts/commands/add-member-to-organization-via-email.command";
import { AddMemberToOrganizationCommand } from "../../application/contracts/commands/add-member-to-organization.command";
import { DeleteCurrentOrganizationCommand } from "../../application/contracts/commands/delete-current-organization.command";
import { LeaveCurrentOrganizationCommand } from "../../application/contracts/commands/leave-current-organization.command";
import { RemoveMemberFromCurrentOrganizationCommand } from "../../application/contracts/commands/remove-member-from-current-organization.command";
import { UpdateMemberRoleCommand } from "../../application/contracts/commands/update-member-role.command";
import { UpdateOrganizationCommand } from "../../application/contracts/commands/update-organization.command";
import { CurrentOrganizationDetails } from "../../application/contracts/dtos/current-organization.dto";
import { OrganizationMemberDetails } from "../../application/contracts/dtos/organization-member.dto";
import { GetOrganizationMembersQuery } from "../../application/contracts/queries/get-organization-members.query";
import { GetOrganizationQuery } from "../../application/contracts/queries/get-organization.query";
import { organizationPermissions } from "../../organization.permissions";

@Controller("organizations/current")
@ApiTags("organizations")
export class CurrentOrganizationController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Read,
  )
  async getCurrentOrganization(
    @Query() query: GetOrganizationQuery,
  ): Promise<CurrentOrganizationDetails> {
    return await this.queryBus.execute(query);
  }

  @Delete()
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Delete,
  )
  async deleteCurrentOrganization(
    @Query() command: DeleteCurrentOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Delete("/leave")
  async leaveCurrentOrganization(
    @Query() command: LeaveCurrentOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Get("/members")
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Members.Read,
  )
  async getCurrentOrganizationMembers(
    @Query() query: GetOrganizationMembersQuery,
  ): Promise<OrganizationMemberDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Post("/members")
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Members.Add,
  )
  async addMemberToOrganization(
    @Body() command: AddMemberToOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Post("/members/email")
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Members.Add,
  )
  async addMemberToOrganizationViaEmail(
    @Body() command: AddMemberToOrganizationViaEmailCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Delete("/members")
  async removeMemberFromCurrentOrganization(
    @Query() command: RemoveMemberFromCurrentOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Put("/members/role")
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Members.UpdateRole,
  )
  async changeMemberRole(
    @Body() command: UpdateMemberRoleCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Patch()
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Update,
  )
  async updateCurrentOrganization(
    @Body() command: UpdateOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
