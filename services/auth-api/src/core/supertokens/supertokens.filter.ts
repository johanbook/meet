import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error as STError } from "supertokens-node";
import { errorHandler } from "supertokens-node/framework/fastify";

@Catch(STError)
export class SupertokensExceptionFilter implements ExceptionFilter {
  handler: ErrorRequestHandler;

  constructor() {
    this.handler = errorHandler;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const resp = context.getResponse<Response>();
    if (resp.headersSent) {
      return;
    }

    this.handler(
      exception,
      context.getRequest<Request>(),
      resp,
      context.getNext<NextFunction>(),
    );
  }
}
