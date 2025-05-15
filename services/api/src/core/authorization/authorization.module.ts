import { Module, forwardRef } from "@nestjs/common";

import { OrganizationModule } from "src/core/organizations/organization.module";
import { ProfileModule } from "src/core/profiles/profile.module";
import { RequestContextModule } from "src/core/request-context/request-context.module";

import { AuthorizationAlsModule } from "./client/context/authorization-als.module";
import { AuthorizationService } from "./domain/services/authorization.service";

@Module({
  controllers: [],
  exports: [AuthorizationAlsModule, AuthorizationService],
  imports: [
    forwardRef(() => AuthorizationAlsModule),
    forwardRef(() => OrganizationModule),
    forwardRef(() => ProfileModule),
    RequestContextModule,
  ],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
