import { Module } from "@nestjs/common";

import { RequestContextModule } from "src/core/request-context/request-context.module";
import { OrganizationModule } from "src/features/organizations/organization.module";
import { ProfileModule } from "src/features/profiles/profile.module";

import { AuthorizationAlsModule } from "./client/context/authorization-als.module";
import { AuthorizationService } from "./domain/services/authorization.service";

@Module({
  controllers: [],
  exports: [AuthorizationAlsModule, AuthorizationService],
  imports: [
    AuthorizationAlsModule,
    OrganizationModule,
    ProfileModule,
    RequestContextModule,
  ],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
