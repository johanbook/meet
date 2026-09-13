import { ConsoleLogger } from "./console.logger";

// The web app swaps in a Sentry logger for production builds. The mobile app
// does not ship an error-tracking SDK yet; both environments log to the
// console. Exchanging this for a Sentry-backed logger is a drop-in change.
export const Logger = ConsoleLogger;
