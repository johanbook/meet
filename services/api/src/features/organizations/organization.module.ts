import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { PhotosModule } from "src/core/photos/photos.module";
import { Profile } from "src/features/profiles";
import { ProfileModule } from "src/features/profiles/profile.module";

import { AddMemberToOrganizationHandler } from "./application/handlers/command-handlers/add-member-to-organization.handler";
import { CreateOrganizationHandler } from "./application/handlers/command-handlers/create-organization.handler";
import { CreatePersonalOrganizationHandler } from "./application/handlers/command-handlers/create-personal-organization.handler";
import { CreatePersonalOrganizationsIfMissingHandler } from "./application/handlers/command-handlers/create-personal-organizations-if-missing.handler";
import { SwitchOrganizationHandler } from "./application/handlers/command-handlers/switch-organization.handler";
import { UpdateMemberRoleHandler } from "./application/handlers/command-handlers/update-member-role.handler";
import { UpdateOrganizationHandler } from "./application/handlers/command-handlers/update-organization.handler";
import { CreateOrganizationOnProfileCreatedHandler } from "./application/handlers/event-handlers/create-organization-on-profile-created.handler";
import { GetOrganizationListHandler } from "./application/handlers/query-handlers/get-organization-list.handler";
import { GetOrganizationMembersHandler } from "./application/handlers/query-handlers/get-organization-members.handler";
import { GetOrganizationHandler } from "./application/handlers/query-handlers/get-organization.handler";
import { CurrentOrganizationController } from "./client/controllers/current-organization.controller";
import { OrganizationsController } from "./client/controllers/organizations.controller";
import { OrganizationJobs } from "./client/jobs/organization.jobs";
import { CurrentOrganizationService } from "./domain/services/current-organization.service";
import { OrganizationService } from "./domain/services/organization.service";
import { ActiveOrganization } from "./infrastructure/entities/active-organization.entity";
import { OrganizationMembership } from "./infrastructure/entities/organization-membership.entity";
import { Organization } from "./infrastructure/entities/organization.entity";

@Module({
  controllers: [CurrentOrganizationController, OrganizationsController],
  exports: [CurrentOrganizationService],
  imports: [
    AuthenticationModule,
    CqrsModule,
    PhotosModule,
    ProfileModule,
    TypeOrmModule.forFeature([
      ActiveOrganization,
      Organization,
      OrganizationMembership,
      Profile,
    ]),
  ],
  providers: [
    AddMemberToOrganizationHandler,
    CreateOrganizationHandler,
    CreateOrganizationOnProfileCreatedHandler,
    CreatePersonalOrganizationHandler,
    CreatePersonalOrganizationsIfMissingHandler,
    CurrentOrganizationService,
    GetOrganizationHandler,
    GetOrganizationListHandler,
    GetOrganizationMembersHandler,
    OrganizationJobs,
    OrganizationService,
    SwitchOrganizationHandler,
    UpdateMemberRoleHandler,
    UpdateOrganizationHandler,
  ],
})
export class OrganizationModule {}
