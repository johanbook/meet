import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Profile } from "src/features/profiles";
import { ProfileModule } from "src/features/profiles/profile.module";

import { CreateOrganizationHandler } from "./application/handlers/command-handlers/create-organization.handler";
import { UpdateOrganizationHandler } from "./application/handlers/command-handlers/update-organization.handler";
import { CreateOrganizationOnProfileCreatedHandler } from "./application/handlers/event-handlers/create-organization-on-profile-created.handler";
import { GetOrganizationHandler } from "./application/handlers/query-handlers/get-organization.handler";
import { OrganizationsController } from "./client/controllers/organizations.controller";
import { CurrentOrganizationService } from "./domain/services/current-organization.service";
import { OrganizationService } from "./domain/services/organization.service";
import { Organization } from "./infrastructure/entities/organization.entity";

@Module({
  controllers: [OrganizationsController],
  exports: [CurrentOrganizationService],
  imports: [
    CqrsModule,
    ProfileModule,
    TypeOrmModule.forFeature([Organization, Profile]),
  ],
  providers: [
    CreateOrganizationHandler,
    CreateOrganizationOnProfileCreatedHandler,
    CurrentOrganizationService,
    GetOrganizationHandler,
    OrganizationService,
    UpdateOrganizationHandler,
  ],
})
export class OrganizationModule {}
