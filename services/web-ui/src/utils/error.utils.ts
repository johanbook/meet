import { ResponseError } from "src/api";

function reponseErrorToMessage(error: ResponseError): string | undefined {
  const response = error.response;

  if (response.errorMessage) {
    return response.errorMessage;
  }

  return response.statusText;
}

export function errorToMessage(error: unknown): string | undefined {
  if (error instanceof ResponseError) {
    return reponseErrorToMessage(error);
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "There was an error";
}
