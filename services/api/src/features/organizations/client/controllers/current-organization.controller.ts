import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { AddMemberToOrganizationCommand } from "../../application/contracts/commands/add-member-to-organization.command";
import { UpdateOrganizationCommand } from "../../application/contracts/commands/update-organization.command";
import { CurrentOrganizationDetails } from "../../application/contracts/dtos/current-organization.dto";
import { OrganizationMemberDetails } from "../../application/contracts/dtos/organization-member.dto";
import { GetOrganizationMembersQuery } from "../../application/contracts/queries/get-organization-members.query";
import { GetOrganizationQuery } from "../../application/contracts/queries/get-organization.query";

@Controller("organizations/current")
@ApiTags("organizations")
export class CurrentOrganizationController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getCurrentOrganization(
    @Query() query: GetOrganizationQuery,
  ): Promise<CurrentOrganizationDetails> {
    return await this.queryBus.execute(query);
  }

  @Get("/members")
  async getCurrentOrganizationMembers(
    @Query() query: GetOrganizationMembersQuery,
  ): Promise<OrganizationMemberDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Post("/members")
  async addMemberToOrganization(
    @Body() command: AddMemberToOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Post()
  async updateCurrentOrganization(
    @Body() command: UpdateOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
