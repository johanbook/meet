import { ResponseError } from "src/api";

function responseErrorToMessage(error: ResponseError): string | undefined {
  const response = error.response;

  if (response.errorMessage) {
    if (Array.isArray(response.errorMessage)) {
      return response.errorMessage.join(", ");
    }

    return response.errorMessage;
  }

  return response.statusText;
}

export function errorToMessage(error: unknown): string | undefined {
  if (error instanceof ResponseError) {
    return responseErrorToMessage(error);
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "There was an error";
}
