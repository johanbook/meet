import { Module } from "@nestjs/common";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { SupertokensModule } from "src/core/supertokens/supertokens.module";
import { UserInfoModule } from "src/features/userinfo/user-info.module";

const API_DOMAIN = process.env.API_URL || `http://localhost`;
const UI_DOMAIN = process.env.UI_URL || `http://localhost`;
const SUPERTOKENS_URL = process.env.SUPERTOKENS_URL || "http://localhost";

@Module({
  imports: [
    AuthenticationModule,
    SupertokensModule.forRoot({
      connectionURI: SUPERTOKENS_URL,
      appInfo: {
        apiBasePath: "/auth/api",
        appName: "Auth",
        apiDomain: API_DOMAIN,
        websiteBasePath: "/login",
        websiteDomain: UI_DOMAIN,
      },
    }),
    UserInfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
