import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

import { BaseError } from "src/core/error-handling";
import { Logger } from "src/infrastructure/logger.service";

@Catch(BaseError)
export class InternalExceptionFilter implements ExceptionFilter {
  private logger = new Logger(InternalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost) {
    this.logger.error({ msg: exception.message, stacktrace: exception.stack });

    const { httpAdapter } = this.httpAdapterHost;
    const context = host.switchToHttp();

    httpAdapter.reply(
      context.getResponse(),
      exception.message,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
