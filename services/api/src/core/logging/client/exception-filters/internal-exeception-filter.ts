import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { v4 as uuidv4 } from "uuid";

import { BaseError } from "src/core/error-handling";
import { Logger } from "src/infrastructure/logger.service";

@Catch(BaseError)
export class InternalExceptionFilter implements ExceptionFilter {
  private logger = new Logger(InternalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost) {
    const errorId = uuidv4();

    this.logger.error({
      errorId,
      msg: exception.message,
      stacktrace: exception.stack,
    });

    const { httpAdapter } = this.httpAdapterHost;
    const context = host.switchToHttp();

    httpAdapter.reply(
      context.getResponse(),
      {
        message:
          "We encountered an internal issue. If the issue is persistent, please contact us.",
        errorId,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
