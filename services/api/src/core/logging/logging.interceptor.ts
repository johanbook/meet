import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Logger } from "src/core/logging";

const WARNING_DURATION_THRESHOLD_MS = 5000;

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  private logRequestDuration(durationInMs: number, request: Request): void {
    this.logger.debug(`Request took ${durationInMs}ms`, {
      duration: durationInMs,
    });

    if (durationInMs > WARNING_DURATION_THRESHOLD_MS) {
      this.logger.warn("Request took longer than usual", {
        durationInMs,
        method: request.method,
        pathname: request.url,
      });
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    return next
      .handle()
      .pipe(tap(() => this.logRequestDuration(Date.now() - now, request)));
  }
}
