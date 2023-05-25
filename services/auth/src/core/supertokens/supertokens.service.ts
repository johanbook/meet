import { Inject, Injectable } from "@nestjs/common";
import supertokens from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";

import {
  ConfigInjectionToken,
  SupertokensModuleConfig,
} from "./supertokens.interface";

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken)
    private readonly config: SupertokensModuleConfig,
  ) {
    supertokens.init({
      appInfo: this.config.appInfo,
      recipeList: [EmailPassword.init(), Session.init(), Dashboard.init()],
      supertokens: {
        connectionURI: this.config.connectionURI,
      },
    });
  }
}
