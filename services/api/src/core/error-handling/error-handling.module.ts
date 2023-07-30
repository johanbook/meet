import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { InternalExceptionFilter } from "./client/exception-filters/internal-exeception-filter";

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: InternalExceptionFilter,
    },
  ],
})
export class ErrorHandlingModule {}
