import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CreateOrganizationCommand } from "../../application/contracts/commands/create-organization.command";
import { SwitchOrganizationCommand } from "../../application/contracts/commands/switch-organization.command";
import { OrganizationDetails } from "../../application/contracts/dtos/organization.dto";
import { GetOrganizationListQuery } from "../../application/contracts/queries/get-organization-list.query";

@Controller("organizations")
@ApiTags("organizations")
export class OrganizationsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async getOrganizations(
    @Query() query: GetOrganizationListQuery,
  ): Promise<OrganizationDetails[]> {
    return await this.queryBus.execute(query);
  }

  @Post()
  async createOrganization(
    @Body() command: CreateOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Post("/switch")
  async switchOrganization(
    @Body() command: SwitchOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
