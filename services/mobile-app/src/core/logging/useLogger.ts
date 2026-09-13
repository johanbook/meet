import { useState } from "react";

import { BaseLogger } from "./base.logger";
import { Logger } from "./logger";

export function useLogger(name: string): BaseLogger {
  const [logger] = useState<BaseLogger>(() => new Logger(name));

  return logger;
}
