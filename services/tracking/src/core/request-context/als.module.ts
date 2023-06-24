import { Module } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

import { RequestContext } from "./request-context.interface";

export const REQUEST_CONTEXT_ALS = new AsyncLocalStorage<RequestContext>();
export const REQUEST_CONTEXT_KEY = "request-context-als";

@Module({
  providers: [
    {
      provide: REQUEST_CONTEXT_KEY,
      useValue: REQUEST_CONTEXT_ALS,
    },
  ],
  exports: [REQUEST_CONTEXT_KEY],
})
export class AlsModule {}
