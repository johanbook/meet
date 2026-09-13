import { Controller, Get, Headers, HttpStatus, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FastifyReply } from "fastify";

import { Logger } from "../logging/logger.service";
import { Session } from "../supertokens/session.decorator";
import { ISession } from "../supertokens/session.interface";

const HTTP_HEADER_USER_ID = process.env.USER_ID_HTTP_HEADER || "x-user-id";
const SUPERTOKENS_URL = process.env.SUPERTOKENS_URL || "http://localhost";
const VERIFY_TIMEOUT_MS = 5000;

export function parseBearerToken(
  authorizationValue?: string,
): string | undefined {
  if (!authorizationValue) {
    return undefined;
  }

  const match = /^Bearer[ \t]+(\S+)$/i.exec(authorizationValue);

  return match ? match[1].trim() : undefined;
}

/**
 * Verifies a Supertokens access token against the session core and returns
 * the owning user id. Native clients cannot read the cookie session (iOS
 * never surfaces Set-Cookie), so they authenticate with the access token as
 * an Authorization header instead.
 */
export async function verifyAccessToken(
  accessToken: string,
): Promise<string | undefined> {
  try {
    const response = await fetch(`${SUPERTOKENS_URL}/recipe/session/verify`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        doAntiCsrfCheck: false,
        enableAntiCsrf: false,
        // Check the database so revoked sessions (e.g. after sign out)
        // are rejected too.
        checkDatabase: true,
      }),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });

    if (!response.ok) {
      return undefined;
    }

    const body = (await response.json()) as {
      session?: { userId?: string };
      status?: string;
    };

    if (body.status === "OK" && typeof body.session?.userId === "string") {
      return body.session.userId;
    }
  } catch {
    // Core unreachable or an unexpected response - deny the request.
  }

  return undefined;
}

@Controller()
@ApiTags("authentication")
export class AuthenticationController {
  private logger = new Logger(AuthenticationController.name);

  @Get("/authenticate")
  async authenticate(
    @Res({ passthrough: false }) response: FastifyReply,
    @Session({
      sessionRequired: false,
    })
    session: ISession,
    @Headers() headers: Record<string, string | undefined>,
  ): Promise<void> {
    let userId = session?.getUserId();

    if (!userId) {
      // Native clients authenticate with the access token instead of the
      // cookie session they cannot read.
      const accessToken = parseBearerToken(headers["authorization"]);

      if (accessToken) {
        userId = await verifyAccessToken(accessToken);
      }
    }

    if (!userId) {
      this.logger.trace("Denied authentication");

      response.status(HttpStatus.UNAUTHORIZED).send();

      return;
    }

    this.logger.trace("Authentication approved");

    response.header(HTTP_HEADER_USER_ID, userId);
    response.status(HttpStatus.OK).send();
  }
}
