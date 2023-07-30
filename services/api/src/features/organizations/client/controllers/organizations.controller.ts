import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { UpdateOrganizationCommand } from "../../application/contracts/commands/update-organization.command";
import { OrganizationDetails } from "../../application/contracts/dtos/organization.dto";
import { GetOrganizationQuery } from "../../application/contracts/queries/get-organization.query";

@Controller("organizations")
@ApiTags("organizations")
export class OrganizationsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get("/current")
  async getCurrentOrganization(
    @Query() query: GetOrganizationQuery,
  ): Promise<OrganizationDetails> {
    return await this.queryBus.execute(query);
  }

  @Post("/update")
  async updateCurrentOrganization(
    @Body() command: UpdateOrganizationCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
