import { Inject, Injectable } from "@nestjs/common";
import supertokens from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword, {
  APIInterface,
} from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import Session from "supertokens-node/recipe/session";

import { Logger } from "../logging/logger.service";
import {
  ConfigInjectionToken,
  SupertokensModuleConfig,
} from "./supertokens.interface";

type SigninPayload = Parameters<APIInterface["signInPOST"]>[0];
type SignupPayload = Parameters<APIInterface["signUpPOST"]>[0];

@Injectable()
export class SupertokensService {
  private logger = new Logger(SupertokensService.name);

  constructor(
    @Inject(ConfigInjectionToken)
    private readonly config: SupertokensModuleConfig,
  ) {
    supertokens.init({
      appInfo: this.config.appInfo,
      recipeList: [
        EmailPassword.init({
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signInPOST: async (input) => {
                  await this.preSigninHook(input);
                  return originalImplementation.signInPOST(input);
                },
                signUpPOST: async (input) => {
                  await this.preSignupHook(input);
                  return originalImplementation.signUpPOST(input);
                },
              };
            },
          },
        }),
        EmailVerification.init({ mode: "REQUIRED" }),
        Session.init(),
        Dashboard.init(),
      ],
      supertokens: {
        connectionURI: this.config.connectionURI,
      },
    });
  }

  private async preSigninHook(input: SigninPayload) {
    this.logger.debug({ msg: "Attempting singin", input });
  }

  private async preSignupHook(input: SignupPayload) {
    this.logger.debug({ msg: "Attempting singup", input });
  }
}
