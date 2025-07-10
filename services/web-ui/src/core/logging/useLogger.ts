import { useState } from "react";

import { Logger } from "./logger";

export function useLogger(name: string) {
  const [logger] = useState(new Logger(name));
  return logger;
}
