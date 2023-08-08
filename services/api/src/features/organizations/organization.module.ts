import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { Profile } from "src/features/profiles";
import { ProfileModule } from "src/features/profiles/profile.module";

import { CreateOrganizationHandler } from "./application/handlers/command-handlers/create-organization.handler";
import { CreatePersonalOrganizationHandler } from "./application/handlers/command-handlers/create-personal-organization.handler";
import { CreatePersonalOrganizationsIfMissingHandler } from "./application/handlers/command-handlers/create-personal-organizations-if-missing.handler";
import { UpdateOrganizationHandler } from "./application/handlers/command-handlers/update-organization.handler";
import { CreateOrganizationOnProfileCreatedHandler } from "./application/handlers/event-handlers/create-organization-on-profile-created.handler";
import { GetOrganizationMembersHandler } from "./application/handlers/query-handlers/get-organization-members.handler";
import { GetOrganizationHandler } from "./application/handlers/query-handlers/get-organization.handler";
import { OrganizationsController } from "./client/controllers/organizations.controller";
import { OrganizationJobs } from "./client/jobs/organization.jobs";
import { CurrentOrganizationService } from "./domain/services/current-organization.service";
import { OrganizationService } from "./domain/services/organization.service";
import { OrganizationMembership } from "./infrastructure/entities/organization-membership.entity";
import { Organization } from "./infrastructure/entities/organization.entity";

@Module({
  controllers: [OrganizationsController],
  exports: [CurrentOrganizationService],
  imports: [
    AuthenticationModule,
    CqrsModule,
    ProfileModule,
    TypeOrmModule.forFeature([Organization, OrganizationMembership, Profile]),
  ],
  providers: [
    CreateOrganizationHandler,
    CreateOrganizationOnProfileCreatedHandler,
    CreatePersonalOrganizationHandler,
    CreatePersonalOrganizationsIfMissingHandler,
    CurrentOrganizationService,
    GetOrganizationHandler,
    GetOrganizationMembersHandler,
    OrganizationJobs,
    OrganizationService,
    UpdateOrganizationHandler,
  ],
})
export class OrganizationModule {}
