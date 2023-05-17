import { Module } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

import { RequestContext } from "./request-context.interface";

export const REQUEST_CONTEXT_ALS = new AsyncLocalStorage<RequestContext>();

@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: REQUEST_CONTEXT_ALS,
    },
  ],
  exports: [AsyncLocalStorage],
})
export class AlsModule {}
