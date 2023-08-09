import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Logger } from "src/core/logging";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  private logRequestDuration(durationInMs: number): void {
    this.logger.debug({
      duration: durationInMs,
      msg: `Request took ${durationInMs}ms`,
    });
  }

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next
      .handle()
      .pipe(tap(() => this.logRequestDuration(Date.now() - now)));
  }
}
