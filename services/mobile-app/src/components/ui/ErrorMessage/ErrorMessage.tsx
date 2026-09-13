import { errorToMessage } from "src/utils";

import { Typography } from "../Typography/Typography";

interface ErrorMessageProps {
  error: unknown;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  const message = errorToMessage(error);

  return <Typography color="textSecondary">{message}</Typography>;
}
