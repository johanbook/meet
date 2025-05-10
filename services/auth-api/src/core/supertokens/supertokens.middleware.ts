import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  supertokensMiddleware: any;

  constructor() {
    this.supertokensMiddleware = (request, rest, next) => next();
  }

  use(request: Request, response: any, next: () => void) {
    return this.supertokensMiddleware(request, response, next);
  }
}
