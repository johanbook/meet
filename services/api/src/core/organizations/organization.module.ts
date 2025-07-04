import { Module, forwardRef } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { AuthorizationModule } from "src/core/authorization/authorization.module";
import { NotificationModule } from "src/core/notifications/notification.module";
import { PhotosModule } from "src/core/photos/photos.module";
import { Profile } from "src/core/profiles";
import { ProfileModule } from "src/core/profiles/profile.module";

import { AddMemberToOrganizationViaEmailHandler } from "./application/handlers/command-handlers/add-member-to-organization-via-email.handler";
import { AddMemberToOrganizationHandler } from "./application/handlers/command-handlers/add-member-to-organization.handler";
import { CreateOrganizationHandler } from "./application/handlers/command-handlers/create-organization.handler";
import { CreatePersonalOrganizationHandler } from "./application/handlers/command-handlers/create-personal-organization.handler";
import { CreatePersonalOrganizationsIfMissingHandler } from "./application/handlers/command-handlers/create-personal-organizations-if-missing.handler";
import { DeleteCurrentOrganizationHandler } from "./application/handlers/command-handlers/delete-current-organization.handler";
import { RemoveMemberFromCurrentOrganizationHandler } from "./application/handlers/command-handlers/remove-member-from-current-organization.handler";
import { SwitchOrganizationHandler } from "./application/handlers/command-handlers/switch-organization.handler";
import { UpdateMemberRoleHandler } from "./application/handlers/command-handlers/update-member-role.handler";
import { UpdateOrganizationPhotoHandler } from "./application/handlers/command-handlers/update-organization-photo.handler";
import { UpdateOrganizationHandler } from "./application/handlers/command-handlers/update-organization.handler";
import { CreateOrganizationOnProfileCreatedHandler } from "./application/handlers/event-handlers/create-organization-on-profile-created.handler";
import { NotifyProfileWhenAddedToOrganizationHandler } from "./application/handlers/event-handlers/notify-profile-when-added-to-organzation.handler";
import { GetOrganizationListHandler } from "./application/handlers/query-handlers/get-organization-list.handler";
import { GetOrganizationMembersHandler } from "./application/handlers/query-handlers/get-organization-members.handler";
import { GetOrganizationHandler } from "./application/handlers/query-handlers/get-organization.handler";
import { CurrentOrganizationController } from "./client/controllers/current-organization.controller";
import { OrganizationsController } from "./client/controllers/organizations.controller";
import { OrganizationJobs } from "./client/jobs/organization.jobs";
import { ActiveOrganizationService } from "./domain/services/active-organization.service";
import { CurrentOrganizationService } from "./domain/services/current-organization.service";
import { MembershipService } from "./domain/services/membership.service";
import { OrganizationService } from "./domain/services/organization.service";
import { ActiveOrganization } from "./infrastructure/entities/active-organization.entity";
import { OrganizationMembership } from "./infrastructure/entities/organization-membership.entity";
import { Organization } from "./infrastructure/entities/organization.entity";

@Module({
  controllers: [CurrentOrganizationController, OrganizationsController],
  exports: [CurrentOrganizationService],
  imports: [
    forwardRef(() => AuthorizationModule),
    forwardRef(() => ProfileModule),
    forwardRef(() => NotificationModule),
    AuthenticationModule,
    CqrsModule,
    PhotosModule,
    TypeOrmModule.forFeature([
      ActiveOrganization,
      Organization,
      OrganizationMembership,
      Profile,
    ]),
  ],
  providers: [
    ActiveOrganizationService,
    AddMemberToOrganizationHandler,
    AddMemberToOrganizationViaEmailHandler,
    CreateOrganizationHandler,
    CreateOrganizationOnProfileCreatedHandler,
    CreatePersonalOrganizationHandler,
    CreatePersonalOrganizationsIfMissingHandler,
    CurrentOrganizationService,
    DeleteCurrentOrganizationHandler,
    GetOrganizationHandler,
    GetOrganizationListHandler,
    GetOrganizationMembersHandler,
    MembershipService,
    NotifyProfileWhenAddedToOrganizationHandler,
    OrganizationJobs,
    OrganizationService,
    RemoveMemberFromCurrentOrganizationHandler,
    SwitchOrganizationHandler,
    UpdateMemberRoleHandler,
    UpdateOrganizationHandler,
    UpdateOrganizationPhotoHandler,
  ],
})
export class OrganizationModule {}
