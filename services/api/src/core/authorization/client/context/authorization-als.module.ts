import { Module } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

import { AuthorizationContext } from "./authorization-context.interface";

export const AUTHORIZATION_ALS = new AsyncLocalStorage<AuthorizationContext>();

export const AUTHORIZATION_ALS_KEY = "authorization-als";

@Module({
  providers: [
    {
      provide: AUTHORIZATION_ALS_KEY,
      useValue: AUTHORIZATION_ALS,
    },
  ],
  exports: [AUTHORIZATION_ALS_KEY],
})
export class AuthorizationAlsModule {}
