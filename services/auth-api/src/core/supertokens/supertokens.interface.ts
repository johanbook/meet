import { AppInfo } from "supertokens-node/types";

export const ConfigInjectionToken = "ConfigInjectionToken";

export type SupertokensModuleConfig = {
  appInfo: AppInfo;
  connectionURI: string;
};
