import { Injectable, NestMiddleware } from "@nestjs/common";

// import { middleware } from "supertokens-node/framework/fastify";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  supertokensMiddleware: any;

  constructor() {
    // this.supertokensMiddleware = middleware();
    this.supertokensMiddleware = (request, rest, next) => next();
  }

  use(request: Request, response: any, next: () => void) {
    return this.supertokensMiddleware(request, response, next);
  }
}
