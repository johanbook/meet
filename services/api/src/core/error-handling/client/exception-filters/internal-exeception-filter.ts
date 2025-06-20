import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { v4 as uuidv4 } from "uuid";

import { Logger } from "src/core/logging";

@Catch()
export class InternalExceptionFilter implements ExceptionFilter {
  private logger = new Logger(InternalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const context = host.switchToHttp();

    if (exception instanceof HttpException) {
      httpAdapter.reply(
        context.getResponse(),
        exception.getResponse(),
        exception.getStatus(),
      );

      return;
    }

    const errorId = uuidv4();

    this.logger.error(exception.message, {
      errorId,
      stackTrace: exception.stack,
    });

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
