import { Module } from "@nestjs/common";

import { AuthenticationModule } from "./core/authentication/authentication.module";
import { SupertokensModule } from "./core/supertokens/supertokens.module";

const API_DOMAIN = process.env.API_URL || `http://localhost`;
const UI_DOMAIN = process.env.UI_URL || `http://localhost`;
const SUPERTOKENS_URL = process.env.SUPERTOKENS_URL || "http://localhost";

@Module({
  imports: [
    AuthenticationModule,
    SupertokensModule.forRoot({
      connectionURI: SUPERTOKENS_URL,
      appInfo: {
        appName: "Auth",
        apiDomain: API_DOMAIN,
        websiteDomain: UI_DOMAIN,
        apiBasePath: "/login",
        websiteBasePath: "/login",
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
