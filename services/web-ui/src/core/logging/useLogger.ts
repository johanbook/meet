import { useState } from "react";

import { Logger } from "./logger";

export function useLogger(name: string): Logger {
  const [logger] = useState(new Logger(name));
  return logger;
}
