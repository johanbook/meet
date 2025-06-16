import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ErrorHandler } from "@nestjs/common/interfaces";
import { Error as STError } from "supertokens-node";
import { errorHandler } from "supertokens-node/framework/fastify";

@Catch(STError)
export class SupertokensExceptionFilter implements ExceptionFilter {
  handler: ErrorHandler;

  constructor() {
    this.handler = errorHandler;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const resp = context.getResponse();
    if (resp.headersSent) {
      return;
    }

    this.handler(exception, context.getRequest(), resp, context.getNext());
  }
}
