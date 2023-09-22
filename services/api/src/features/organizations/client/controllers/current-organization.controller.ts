import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { RequiresOrganizationPermissions } from "src/core/authorization";

import { AddMemberToOrganizationCommand } from "../../application/contracts/commands/add-member-to-organization.command";
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
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Read,
  )
  async getCurrentOrganization(
    @Query() query: GetOrganizationQuery,
  ): Promise<CurrentOrganizationDetails> {
    return await this.queryBus.execute(query);
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

  @Post("/members/role")
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Members.UpdateRole,
  )
  async changeMemberRole(
    @Body() command: UpdateMemberRoleCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Post()
  @RequiresOrganizationPermissions(
    organizationPermissions.CurrentOrganization.Update,
  )
  async updateCurrentOrganization(
    @Body() command: UpdateOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
